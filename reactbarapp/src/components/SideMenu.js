import React from "react";
import "./SideMenu.css";
import logo from "../logo.png";

import AddOrder from "./AddOrder";

import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

export default function SideMenu() {
  const user = localStorage.getItem("user");

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

      </div>

      <AddOrder key="a" />
    </div>
  )
}