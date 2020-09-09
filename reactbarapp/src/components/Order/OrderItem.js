import React from "react";

import { useAuth } from "../../use-auth";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

import "./OrderItem.css";

export default function OrderItem({ id, done, quantity, orderId, type, notes }) {

  const auth = useAuth();
  let user = null;
  if (auth.user) user = auth.user.displayName;

  //cargamos los platos
  let [plate, loading, error] = useDocument(firebase.firestore().doc(`/bars/${user}/menu/itemsList/${type}/${id}`));
  if (error) {
    return <h4>Error: {JSON.stringify(error)}</h4>;
  }
  if (loading) {
    return null;
  }
  if (plate.data()) {
    return (
      <label key={id}>
        <span className="quantity">x{quantity}</span>
        <input type="checkbox" checked={done} onChange={() => {
          firebase.firestore().collection(`/bars/${user}/orders/${orderId}/orderItems`).doc(id).update({ done: !done })
        }} />
        <span className="plate">{plate.data().name}</span>
        <span className="redS" /> {plate.data().price}€
        {notes ? <p><span className="redS" />{notes}</p> : undefined}

      </label>
    )
  } return null

}
