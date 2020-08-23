import React, { useState } from "react";
import "./SideMenu.css";
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import logo from "../logo.png";

import AddOrder from "./AddOrder";

import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

export default function SideMenu() {
  const user = localStorage.getItem("user");
  let length = parseInt(sessionStorage.getItem("tablesLength"));
  const [tablesLength, setTablesLength] = useState(length);

  const db = firebase.firestore();
  const [bar, loading, error] = useDocument(db.doc(`/bars/${user}`));

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading) {
    return <div></div>;
  }

  return (
    <div className="sideMenu">
      <img src={logo} className="logo" alt="BarApp logo" />
      <h2>{bar.data().name}</h2>
      <div>
        <p><strong>Adress: </strong> {bar.data().adress}</p>
        <p><strong>E-mail: </strong> {user}</p>
        <p><strong>Tables: </strong> <AiFillMinusCircle className="react-icon" onClick={(() => {
          if (tablesLength > 1) setTablesLength(tablesLength - 1);
        })} /><span>{tablesLength}</span>
          <AiFillPlusCircle className="react-icon" onClick={(() => {
            if (tablesLength < 50) setTablesLength(tablesLength + 1);
          })} /> <button onClick={() => {
            if (tablesLength !== parseInt(length)) {
              const updateTables = window.confirm("Are you sure you want to change the number of tables?\nYou might erase some active orders aswell");
              if (updateTables) {
                if (tablesLength > parseInt(length)) {
                  for (let i = 0; i < (tablesLength - length); i++) {
                    db.doc(`/bars/${user}/tables/${length + 1 + i}`).set({
                      occupied: false
                    }).catch(function (error) {
                      console.error("Error creating document: ", error);
                    });
                  }
                }
                else {
                  for (let i = 0; i < (length - tablesLength); i++) {
                    db.doc(`/bars/${user}/tables/${length - i}`).delete().catch(function (error) {
                      console.error("Error removing document: ", error);
                    });
                  }
                }
                return true;
              }
              else {
                setTablesLength(length);
                return false;
              }
            }
          }}>SAVE</button></p>

      </div>

      <AddOrder key="a" />
    </div>
  )
}