import React from "react";
import firebase from "@firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";

import { TiDeleteOutline } from 'react-icons/ti';
import "./Menu.css";

export default function PlatesList({ category }) {
    
    const user = localStorage.getItem("user");

    const [plates, loading, error] = useCollection(
        firebase.firestore().collection(`/bars/${user}/menu/itemsList/${category}`)
    );

    if (error) {
        return <h4>Error: {JSON.stringify(error)}</h4>;
    }
    if (loading) {
        return <h4>Loading plates...</h4>;
    }

    if (plates.docs.length > 0) return (
        <ul>
            {plates.docs.map((plate) => {
                return <li key={plate.id}>{plate.data().name} <span className="grayS" /> {plate.data().price}€
            <TiDeleteOutline className="react-icon" onClick={() => {
                        if (window.confirm("Are you sure you want to delete this plate?")) {
                            firebase.firestore().doc(`/bars/${user}/menu/itemsList/${category}/${plate.id}`).delete()
                                .catch(e => {
                                    alert(e.message);
                                })
                        }
                    }} /></li>
            })}
        </ul>)

    else return <h3>No plates on the menu!</h3>
}