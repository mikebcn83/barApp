import React from "react";

import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

import "./OrderItem.css";

export default function OrderItem({ id, done, quantity, orderId, type, notes }) {

  const user = localStorage.getItem("user");

  //cargamos los platos
  let [plate, loading, error] = useDocument(firebase.firestore().doc(`/bars/${user}/menu/itemsList/${type}/${id}`));
  if (error) {
    return <h4>Error: {JSON.stringify(error)}</h4>;
  }
  if (loading) {
    return <div/>;
  }
    if (plate.data() !== undefined) {
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
      )} else return null

}
