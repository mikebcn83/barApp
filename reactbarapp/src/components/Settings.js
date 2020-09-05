import React, { useState, useEffect } from "react";
import firebase from "@firebase/app";

import Header from "./Header";

import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import "./Settings.css";


export default function Settings() {
    const user = localStorage.getItem("user");
    const tables = parseInt(localStorage.getItem("tables"));

    useEffect(() => {
        if (user && tables) {
            localStorage.setItem("tables", tables);
        }
    }, []); //save the values

    const [tablesLength, setTablesLength] = useState(tables);

    const db = firebase.firestore();

    const updateTables = (event) => {
        event.preventDefault();
        if (tablesLength !== tables) {
            const updateTables = window.confirm("Are you sure you want to change the number of tables?\nYou might erase some active orders aswell");
            if (updateTables) {
                if (tablesLength > tables) {
                    for (let i = 0; i < (tablesLength - tables); i++) {
                        db.doc(`/bars/${user}/tables/${tables + 1 + i}`).set({
                            occupied: false
                        }).catch(function (error) {
                            console.error("Error creating document: ", error);
                        });
                    }
                }
                else {
                    for (let i = tables; i > (tablesLength); i--) {
                        db.doc(`/bars/${user}/tables/${i}`).delete().catch(function (error) {
                            console.error("Error removing document: ", error);
                        });
                    }
                }
                setTablesLength(tablesLength); //actualizamos el numero de mesas
                localStorage.setItem("tables", tablesLength);
                return true;
            }
            else {
                setTablesLength(tables);
                return false;
            }
        }
    }

    const logOut = () => {
        const logOut = window.confirm("Are you sure you want to log out?");
        if (logOut) {
            firebase.auth().signOut().then(function () {
                localStorage.clear();
                window.location.replace("/");
            }, function (error) {
                console.error('Sign Out Error', error);
            });
            return true;
        }
        else return false;
    }

    return (
        <>
            <Header />

            <div className="settings">
                <h2>Change Number of tables</h2>
                <form onSubmit={updateTables}>
                    <label>Tables: <AiFillMinusCircle className="react-icon" onClick={(() => {
                        if (tablesLength > 1) setTablesLength(tablesLength - 1);
                    })} /><span className="mono">{tablesLength}</span>
                        <AiFillPlusCircle className="react-icon" onClick={(() => {
                            if (tablesLength < 50) setTablesLength(tablesLength + 1);
                        })} /> </label>
                    <button type="submit">SAVE</button>
                </form>
                <button className="logout" onClick={logOut}>LOGOUT</button>
            </div>
        </>
    )

}

