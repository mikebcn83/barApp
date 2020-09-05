import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import firebase from "@firebase/app";
import OrderItem from "./OrderItem";

import Header from "./Header";

export default function OrderScreen() {
  const user = localStorage.getItem("user");
  const [total, setTotal] = useState(0);
  const [payed, setPayed] = useState(false);
  const [order, setOrder] = useState(null);

  const numTable = window.location.href.split("/").pop();

  useEffect(() => {
    async function fetchOrder() {
      await firebase.firestore().doc(`bars/${user}/tables/${numTable}`).get().then((doc) => {
        setOrder(doc.data().order);

        firebase.firestore().doc(`bars/${user}/orders/${doc.data().order}`).get().then((doc) => {
          setPayed(doc.data().payed);
          setTotal(doc.data().total);
        });

      });
    }
    fetchOrder();
  }, []);

  //cargamos los datos de la db
  const db = firebase.firestore();

  let [orderItems, loading, error] = useCollection(
    db.collection(`/bars/${user}/orders/${order}/orderItems`)
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
            <OrderItem key={orderItem.id} id={orderItem.id} {...orderItem.data()} order={order} />
          );
        })}
      </div>
      <p className="orderInfo"> Total: {total}€ <span className="redS" />
        {payed ? <span>Order payed</span> : <span className="red">Order not payed</span>} </p>
      <button onClick={() => {
        if (window.confirm("Are you sure you are done with this table?")) {
          db.doc(`/bars/${user}/tables/${numTable}`).set({ occupied: false }); //1. poner la mesa como libre
          db.collection("cities").doc("DC").delete().then(() => {
            window.location.replace("/");
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
        }
      }}>CLEAR</button>
    </>
  );
}
