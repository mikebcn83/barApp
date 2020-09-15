import React, { useState, useRef } from "react";
import firebase from "@firebase/app";
import { useDocument } from "react-firebase-hooks/firestore";

export default function UserEditor({ username }) {

    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const nameRef = useRef(null);
    const addressRef = useRef(null);

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
            address
        }).catch((e) => {
            console.error(e);
        });
        nameRef.current.value = '';
        addressRef.current.value = '';
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
                <label className="userLabel">Address: {userDoc.data().address}
                    <input type="text" placeholder="New Address" ref={addressRef}
                        onChange={(address) =>
                            setAddress(address.target.value)} />
                </label>
                <button type="submit" value="SAVE">SAVE</button>
            </form>
        </>
    );
}