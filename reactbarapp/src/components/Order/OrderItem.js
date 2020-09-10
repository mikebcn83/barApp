import React from "react";

import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

import "./OrderItem.css";

export default function OrderItem({ id, done, quantity, orderId, type, notes, username }) {

  //cargamos los platos
  let [plate, loading, error] = useDocument(firebase.firestore().doc(`/bars/${username}/menu/itemsList/${type}/${id}`));
  if (error) {
    return <h4>Error: {JSON.stringify(error)}</h4>;
  }
  if (loading) {
    return null;
  }

  return (
    <label key={id}>
      <span className="quantity">x{quantity}</span>
      <input type="checkbox" checked={done} onChange={() => {
        firebase.firestore().collection(`/bars/${username}/orders/${orderId}/orderItems`).doc(id).update({ done: !done })
      }} />
      <span className="plate">{plate.data().name}</span>
      <span className="redS" /> {plate.data().price}€
      {notes ? <p><span className="redS" />{notes}</p> : undefined}
    </label>
  )
}
