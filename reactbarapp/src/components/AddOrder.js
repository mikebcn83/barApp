import React from "react";
import firebase from "@firebase/app";

//version temporal para añadir perdidos

export default function AddOrder() {
  const user = localStorage.getItem("user");

  return (
    <div>
      <label>Table: </label>
      <select id="table" name="table">
        <option value="1">Table 1</option>
        <option value="2">Table 2</option>
        <option value="3">Table 3</option>
        <option value="4">Table 4</option>
      </select>
      <label>Plate: </label>
      <select id="plate" name="plates">
        <option value="YYnkmAVTPUHi3VvHH5ky">Calamares</option>
        <option value="P3UbxL5vaww898LlLKp0">Bravas</option>
        <option value="ZhO4Vbif6bMJJHr6lHY7">Croquetas</option>
      </select>
      <input type="submit" onClick={(() => {
        const table = document.getElementById("table").value;
        const plate = document.getElementById("plate").value;

        const plateRef = firebase.firestore().collection(`/bars/${user}/tables/${table}/orderItems`).doc(plate);

        plateRef.get()
          .then((doc) => {
            if (doc.exists) { //si ya existe ese documento (plato)
              let quant = doc.data().quantity + 1; //sumar 1 a cantidad

              plateRef.set({
                quantity: quant //añadir nueva cantidad
              }, { merge: true })

            } else { //sino
              firebase.firestore().doc(`/bars/${user}/tables/${table}`).update({
                occupied: true //aquí cambiamos el valor de la mesa a ocupada (por si no lo está)
              });

              plateRef.set({
                done: false,
                quantity: 1 //aquí estamos creando un documento con el id del plate obtenido del select
              }, { merge: true });
            }
          });

      })} />
    </div>
  );
}
