import React, { useState, useEffect } from "react";
import firebase from "@firebase/app";
import QRCode from "qrcode.react";

import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

function QRs({ username, tables }) {

    let qrs = [];
    for (let i = 0; i < tables; i++) {
        qrs.push(<div className="tableqr" key={i + 1}>
            <h3>Table {i + 1}</h3>
            <QRCode value={`https://www.barapp.com/${username}/tables/${i + 1}`} />
        </div>);
    }

    return <div className="qrsList" >{qrs}</div>;
}

export default function TablesEditor({ username }) {

    const [tablesLength, setTablesLength] = useState();
    const [newTablesLength, setNewTablesLength] = useState();
    const [showQRs, setShowQRs] = useState(false);
    const [buttonValue, setButtonValue] = useState("SHOW TABLES QRS")

    useEffect(() => { //sincronizamos el numero de mesas cuando tenemos el user
        firebase.firestore().collection(`/bars/${username}/tables`).get().then(doc => {
            setTablesLength(doc.size);
            setNewTablesLength(doc.size);
        });
    }, [username]);

    const updateTables = (event) => {
        event.preventDefault();
        if (tablesLength !== newTablesLength) {
            if (window.confirm("Are you sure you want to change the number of tables?\nYou might erase some active orders aswell")) {

                if (tablesLength < newTablesLength) {
                    for (let i = 0; i < (newTablesLength - tablesLength); i++) { //si queremos más mesas añadimos las de más
                        firebase.firestore().collection(`/bars/${username}/tables`).doc(newTablesLength.toString()).set({
                            occupied: false
                        }).catch(function (error) {
                            console.error("Error creating document: ", error);
                        });
                    }
                }
                else {
                    for (let i = tablesLength; i > newTablesLength; i--) { //si queremos menos mesas borramos las que sobran
                        firebase.firestore().collection(`/bars/${username}/tables`).doc(i.toString()).delete().catch(function (error) {
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

    const toggleQrs = () => {
        setShowQRs(!showQRs);
        if (buttonValue === "SHOW TABLES QRS") setButtonValue("HIDE TABLES QRS");
        else setButtonValue("SHOW TABLES QRS");
    }

    return (
        <>
            <h3>Edit tables</h3>
            <form className="tablesform" onSubmit={updateTables}>
                <label>Number of tables: <AiFillMinusCircle className="react-icon" onClick={(() => {
                    if (newTablesLength > 1) setNewTablesLength(newTablesLength - 1);
                })} /><span className="mono">{newTablesLength}</span>
                    <AiFillPlusCircle className="react-icon" onClick={(() => {
                        if (newTablesLength < 50) setNewTablesLength(newTablesLength + 1);
                    })} /> </label>
                <button type="submit">SAVE</button>
            </form>
            {showQRs && <QRs tables={tablesLength} />}
            <button className="bttn2" onClick={toggleQrs}>{buttonValue}</button>
        </>
    );
}