import React from "react";
import "./OrderItem.css";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

export default function OrderItem({id, done, quantity}) {

  //cargamos los platos
  let [plates, loading, error] = useCollection(firebase.firestore().collection(`/bars/testbar/menu`));
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  let name;
  let price;

  plates.docs.map((plate) => {
    if(plate.id === id) { //compara: el id del documento de dentro de la colección de platos
                          //con el id del documento de dentro de la colección orderItems de la mesa
      name = plate.data().name;
      price = plate.data().price;}
      return;
    });
  
  const numTable = window.location.href.split("/").pop(); //el numero de mesa lo tenemos por la ubicación

  return (
    <label>
      <span className="quantity">x{quantity}</span>
      <input type="checkbox" checked={done} onChange={()=> {
      firebase.firestore().collection(`/bars/testbar/tables/${numTable}/orderItems`).doc(id).update({done: !done})}}/>      
      <span className="plate">{name}</span>
      <span className="redDot"/> {price}€
    </label>
  );
}
