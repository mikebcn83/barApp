import React, { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import firebase from "@firebase/app";
import QRCode from "qrcode.react";

import { useAuth } from "../../use-auth";
import Header from "../Header";
import OrderItemsList from "./OrderItemsList";

export default function OrderScreen() {

  const auth = useAuth();
  let user = null;
  if (auth.user) user = auth.user.displayName;

  const [orderId, setOrderId] = useState(null);
  const table = window.location.href.split("?table=").pop();

  useEffect(() => {
    async function fetchOrder() {
      await firebase.firestore().doc(`bars/${user}/tables/${table}`).get().then((doc) => {
        if (doc.exists) setOrderId(doc.data().order);
      });
    }
    fetchOrder();
  }, [user, table]);

  //cargamos los datos de la db
  let [order, loading, error] = useDocument(firebase.firestore().doc(`/bars/${user}/orders/${orderId}`));

  if (error) {
    return <h4>Error: {JSON.stringify(error)}</h4>;
  }
  if (loading) {
    return <div className="loading"><img alt="loading" src="https://ccps.aemps.es/ccps/images/loader.gif" /></div>;
  }

  if (order.data() === undefined) return (
    <>
      <Header />
      <h1>Table {table}</h1>
      <h3>No orders in this table ! </h3>
    </>
  )

  if (order.data()) return (
    <>
      <Header />
      <h1>Table {table}</h1>
      <div className="orderScreen">
        <div className="list">
          <OrderItemsList order={orderId} username={user} />
          <p className="orderInfo"> Total: {order.data().total}€ <span className="redS" />
            {order.data().payed ? <span>Order payed</span> : <span className="red">Order not payed</span>} </p>
          <button onClick={() => {
            if (window.confirm("Are you sure you are done with this table?")) {
              firebase.firestore().doc(`/bars/${user}/tables/${table}`).set({
                occupied: false
              }).catch(function (error) {
                console.error("Error updating documents", error);
              });
            }
          }}><Link className="buttonlink" to="">CLEAR</Link></button>
        </div>
        <div className="qr">
          <h2>QR Code for this table</h2>
          <QRCode value={`https://www.barapp.com/${user}/tables/${table}`} />
        </div>
      </div>
    </>
  );
  return null;
}