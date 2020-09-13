import React, { useState, useRef } from "react";
import firebase from "@firebase/app";
import { useDocument } from "react-firebase-hooks/firestore";

export default function UserEditor({ username }) {

    const [name, setName] = useState(null);
    const [adress, setAdress] = useState(null);
    const nameRef = useRef(null);
    const adressRef = useRef(null);

    let [userDoc, loading, error] = useDocument(firebase.firestore().doc(`/bars/${username}`));
    if (error) {
        return <h4>Error: {JSON.stringify(error)}</h4>;
    }
    if (loading) {
        return <div className="loading"><img alt="loading" src="https://ccps.aemps.es/ccps/images/loader.gif" /></div>;
    }

    const dataSubmit = (e) => {
        e.preventDefault();
        firebase.firestore().doc(`/bars/${username}`).set({
            name,
            adress
        }).catch((e) => {
            console.error(e);
        });
        nameRef.current.value = '';
        adressRef.current.value = '';
    }

    return (
        <>
            <h3>Edit Bar data</h3>
            <form onSubmit={dataSubmit}>
                <label className="userLabel">Bar name: {userDoc.data().name}
                    <input type="text" placeholder="New bar name" ref={nameRef}
                        onChange={(name) =>
                            setName(name.target.value)} />
                </label>
                <label className="userLabel">Adress: {userDoc.data().adress}
                    <input type="text" placeholder="New Adress" ref={adressRef}
                        onChange={(adress) =>
                            setAdress(adress.target.value)} />
                </label>
                <button type="submit" value="SAVE">SAVE</button>
            </form>
        </>
    );
}