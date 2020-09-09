import React from "react";
import firebase from "@firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";

import { useAuth } from "../../use-auth";
import { TiDeleteOutline } from 'react-icons/ti';
import "./Menu.css";

export default function PlatesList({ type }) {

    const auth = useAuth();
    let user = null;
    if (auth.user) user = auth.user.displayName;

    const [plates, loading, error] = useCollection(
        firebase.firestore().collection(`/bars/${user}/menu/itemsList/${type}`)
    );

    if (error) {
        return <h4>Error: {JSON.stringify(error)}</h4>;
    }
    if (loading) {
        return <div className="loading"><img alt="loading" src="https://ccps.aemps.es/ccps/images/loader.gif" /></div>;
    }

    if (plates) {
        if (plates.docs.length > 0) return (
            <ul>
                {plates.docs.map((plate) => {
                    return (
                        <li key={plate.id}>
                            {plate.data().imageUri &&
                                <img alt="plate image" src={plate.data().imageUri} />}
                            <p>{plate.data().name} <span className="grayS" /> {plate.data().price}€
                            <TiDeleteOutline className="react-icon" onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this plate?")) {
                                        firebase.firestore().doc(`/bars/${user}/menu/itemsList/${type}/${plate.id}`).delete()
                                            .catch(e => {
                                                alert(e.message);
                                            })
                                    }
                                }} /></p>
                            <p>{plate.data().ingredients}</p></li>
                    );
                })}
            </ul>)

        return <h3>No plates on the menu!</h3>
    } return null
}