import React from "react";

import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";
import { useAuth } from "../../use-auth";

import "./SideMenu.css";
import logo from "../../logo.png";

export default function SideMenu() {

  const auth = useAuth();
  let user, email = null;
  if (auth.user) {
    user = auth.user.displayName;
    email = auth.user.email
  }

  const db = firebase.firestore();
  const [bar, loading, error] = useDocument(db.doc(`/bars/${user}`));

  if (error) {
    return <h4>Error: {error.toString()}</h4>;
  }
  if (loading) {
    return null;
  }

  if (bar.data()) {
    return (
      <div className="sideMenu">
        <img src={logo} className="logo" alt="BarApp logo" />
        <h2>{bar.data().name}</h2>
        <div>
          <p><strong>Adress: </strong> {bar.data().adress}</p>
          <p><strong>E-mail: </strong> {email}</p>
        </div>
      </div>
    )
  } return null;
}