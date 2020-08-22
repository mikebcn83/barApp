import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";
import OrderItem from "./OrderItem";
import Header from "./Header";

export default function OrderScreen() {
  const user = localStorage.getItem("user");

  //conseguimos el numero de mesa por la ruta
  const numTable = window.location.href.split("/").pop();

  //cargamos la colección de orderItems
  const db = firebase.firestore();
  let [orderItems, loading, error] = useCollection(
    db.collection(`/bars/${user}/tables/${numTable}/orderItems`)
  );
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <h1>Table {numTable}</h1>
      <div className="orderItems">
        {orderItems.docs.map((orderItem) => {
          return ( //al componente OrderItem le pasamos la data 
            //del documento de la colección orderItems para pintarlo
            <OrderItem key={orderItem.id} id={orderItem.id} {...orderItem.data()} />
          );
        })}
      </div>
      <button onClick={() => {
        if (window.confirm("Are you sure you are done with this table?")) {
          db.doc(`/bars/${user}/tables/${numTable}`).set({ occupied: false }); //1. poner la mesa como libre

          db.collection(`/bars/${user}/tables/${numTable}/orderItems/`).get().then((res) => {
            res.forEach((element) => { //2. borrar coleccion de documentos orderItems
              element.ref.delete();
            });
          });
        }
      }}>CLEAR</button>
    </>
  );
}
