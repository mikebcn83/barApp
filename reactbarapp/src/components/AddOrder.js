import React from "react";
import "./OrderItem.css";
import firebase from "@firebase/app";

//version temporal para añadir perdidos

export default function AddOrder() {
  return (
      <>
      <label>Table: </label>
      <select id="table" name="table">
        <option value="1">Table 1</option>
        <option value="2">Table 2</option>
        <option value="3">Table 3</option>
        <option value="4">Table 4</option>
      </select>
      <label>Plate: </label>
      <select id="plate" name="plates">
        <option value="FbvOsACLyzSj90XcamHd">Calamares</option>
        <option value="P3UbxL5vaww898LlLKp0">Bravas</option>
        <option value="ZhO4Vbif6bMJJHr6lHY7">Croquetas</option>
      </select>
      <input type="submit" onClick={(()=> {
          const table = document.getElementById("table").value;
          const plate = document.getElementById("plate").value;
          firebase.firestore().doc(`/tables/${table}`).set({
              occupied: true //aquí cambiamos el valor de la mesa a ocupada (por si no lo está)
          }, { merge: true })
          firebase.firestore().collection(`/tables/${table}/orderItems`).doc(plate).set({
            done: false //aquí estamos creando un documento con el id del plate obtenido del select
        }, { merge: true });
        
          })}/>
    </>
  );
}
