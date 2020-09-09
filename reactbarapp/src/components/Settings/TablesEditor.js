import React, { useState, useEffect } from "react";
import firebase from "@firebase/app";

import { useAuth } from "../../use-auth.js";

import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

export default function TablesEditor() {

    const auth = useAuth();
    let user = null;
    if (auth.user) user = auth.user.displayName;

    const [tablesLength, setTablesLength] = useState();
    const [newTablesLength, setNewTablesLength] = useState();

    useEffect(() => { //sincronizamos el numero de mesas cuando tenemos el user
        firebase.firestore().collection(`/bars/${user}/tables`).get().then(doc => {
            setTablesLength(doc.size);
            setNewTablesLength(doc.size);
        });
    }, [user]);

    if (user) {
        const updateTables = (event) => {
            event.preventDefault();
            if (tablesLength !== newTablesLength) {
                if (window.confirm("Are you sure you want to change the number of tables?\nYou might erase some active orders aswell")) {

                    if (tablesLength < newTablesLength) {
                        for (let i = 0; i < (newTablesLength - tablesLength); i++) { //si queremos más mesas añadimos las de más
                            firebase.firestore().collection(`/bars/${user}/tables`).doc(newTablesLength.toString()).set({
                                occupied: false
                            }).catch(function (error) {
                                console.error("Error creating document: ", error);
                            });
                        }
                    }
                    else {
                        for (let i = tablesLength; i > newTablesLength; i--) { //si queremos menos mesas borramos las que sobran
                            firebase.firestore().collection(`/bars/${user}/tables`).doc(i.toString()).delete().catch(function (error) {
                                console.error("Error removing document: ", error);
                            });
                        }
                    }
                    setTablesLength(newTablesLength); //actualizamos el numero de mesas
                    return true;
                }
                else {
                    setTablesLength(tablesLength); //sino vuelve al anterior
                    return false;
                }
            }
        }

        return (
            <>
                <h3>Edit number of tables</h3>
                <form className="tablesform" onSubmit={updateTables}>
                    <label>Tables: <AiFillMinusCircle className="react-icon" onClick={(() => {
                        if (newTablesLength > 1) setNewTablesLength(newTablesLength - 1);
                    })} /><span className="mono">{newTablesLength}</span>
                        <AiFillPlusCircle className="react-icon" onClick={(() => {
                            if (newTablesLength < 50) setNewTablesLength(newTablesLength + 1);
                        })} /> </label>
                    <button type="submit">SAVE</button>
                </form>
            </>
        )
    } return null;
}