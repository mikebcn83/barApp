import React from "react";

import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

import "./OrderItem.css";

export default function OrderItem({ id, done, quantity, order }) {

  const user = localStorage.getItem("user");

  //cargamos los platos
  let [plates, loading, error] = useCollection(firebase.firestore().collection(`/bars/${user}/menu`));
  if (error) {
    return <h4>Error: {JSON.stringify(error)}</h4>;
  }
  if (loading) {
    return <div />;
  }

  return (
    <label>
      <span className="quantity">x{quantity}</span>
      <input type="checkbox" checked={done} onChange={() => {
        firebase.firestore().collection(`/bars/${user}/orders/${order}/orderItems`).doc(id).update({ done: !done })
      }} />
      {plates.docs.map((plate) => {
        if (plate.id === id) { //compara: el id del documento de dentro de la colección de platos
          //con el id del documento de dentro de la colección orderItems de la mesa              
          return (<p key={id}>
            <span className="plate">{plate.data().name}</span>
            <span className="redS" /> {plate.data().price}€
          </p>)
        }
      })
      }
    </label>
  );
}
