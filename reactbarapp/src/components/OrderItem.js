import React from "react";
import "./OrderItem.css";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

export default function OrderItem({id, done}) {

  //cargamos los platos
  let [plates, loading, error] = useCollection(firebase.firestore().collection(`/platos`));
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  let name;
  let price;

  plates.docs.map((plate) => {
    if(id.includes(" ")) id = id.slice(1); //este filtro es porque a veces el id se pasa con un espacio delante ??
    if(plate.id === id) { //compara: el id del documento de dentro de la colección de platos
                          //con el id del documento de dentro de la colección orderItems de la mesa
      name = plate.data().nombre;
      price = plate.data().precio;}
      return;
    });
  
  const numTable = window.location.href.split("/").pop(); //el numero de mesa lo tenemos por la ubicación

  return (
    <label>
      <input type="checkbox" checked={done} onChange={()=> {
      firebase.firestore().collection(`/tables/${numTable}/orderItems`).doc(id).update({done: !done})}}/>      
      <span className="plate">{name}</span> <span className="redDot"/> {price}€
    </label>
  );
}
