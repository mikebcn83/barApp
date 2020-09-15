import React from "react";

import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

import "./SideMenu.css";
import logo from "../../logo.png";

export default function SideMenu({ user }) {


  const username = user.displayName;
  const email = user.email

  const db = firebase.firestore();
  const [bar, loading, error] = useDocument(db.doc(`/bars/${username}`));

  if (error) {
    return <h4>Error: {error.toString()}</h4>;
  }
  if (loading) {
    return null;
  }

  return (
    <div className="sideMenu">
      <img src={logo} className="logo" alt="BarApp logo" />
      <h2>{bar.data().name}</h2>
      <div>
        <p><strong>Address: </strong> {bar.data().address}</p>
        <p><strong>E-mail: </strong> {email}</p>
      </div>
    </div>
  )
}