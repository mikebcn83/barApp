import React, { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

import firebase from "@firebase/app";

import Header from "../Header";
import OrderItemsList from "./OrderItemsList";

export default function OrderScreen() {
  const user = localStorage.getItem("user");
  const [orderId, setOrderId] = useState(null);
  const numTable = window.location.href.split("/").pop();

  useEffect(() => {
    async function fetchOrder() {
      await firebase.firestore().doc(`bars/${user}/tables/${numTable}`).get().then((doc) => {
        if (doc.exists) setOrderId(doc.data().order);
      });
    }
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //cargamos los datos de la db
  const db = firebase.firestore();

  let [order, loading, error] = useDocument(db.doc(`/bars/${user}/orders/${orderId}`));

  if (error) {
    return <h4>Error: {JSON.stringify(error)}</h4>;
  }
  if (loading) {
    return <h4>Loading orders...</h4>;
  }

  if (order.data() === undefined) return (
    <>
      <Header />
      <h1>Table {numTable}</h1>
      <h3>No orders in this table ! </h3>
    </>
  )

  return (
    <>
      <Header />
      <h1>Table {numTable}</h1>
      <OrderItemsList order={orderId} />
      <p className="orderInfo"> Total: {order.data().total}€ <span className="redS" />
        {order.data().payed ? <span>Order payed</span> : <span className="red">Order not payed</span>} </p>
      <button onClick={() => {
        if (window.confirm("Are you sure you are done with this table?")) {
          const tableRef = db.doc(`/bars/${user}/tables/${numTable}`);
          const orderRef = db.doc(`bars/${user}/orders/${orderId}`);
          db.runTransaction((tx) => {
            return tx.get(tableRef).then(() =>{
              tx.set(tableRef, { occupied: false })
              tx.delete(orderRef.collection('orderItems'));
              tx.delete(orderRef);
              window.location.replace("/")
            });
          }).catch(function (error) {
            console.error("Error updating documents",error);
          });
        }
      }}>CLEAR</button>
    </>
  );
}