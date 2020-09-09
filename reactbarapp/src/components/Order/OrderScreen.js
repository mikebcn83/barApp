import React, { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import firebase from "@firebase/app";

import { useAuth } from "../../use-auth";
import Header from "../Header";
import OrderItemsList from "./OrderItemsList";

export default function OrderScreen() {

  const auth = useAuth();
  let user = null;
  if (auth.user) user = auth.user.displayName;

  const [orderId, setOrderId] = useState(null);
  const numTable = window.location.href.split("?table=").pop();

  useEffect(() => {
    async function fetchOrder() {
      await firebase.firestore().doc(`bars/${user}/tables/${numTable}`).get().then((doc) => {
        if (doc.exists) setOrderId(doc.data().order);
      });
    }
    fetchOrder();
  }, [user, numTable]);

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
      <h1>Table {numTable}</h1>
      <h3>No orders in this table ! </h3>
    </>
  )

  if (order.data()) return (
    <>
      <Header />
      <h1>Table {numTable}</h1>
      <OrderItemsList order={orderId} />
      <p className="orderInfo"> Total: {order.data().total}€ <span className="redS" />
        {order.data().payed ? <span>Order payed</span> : <span className="red">Order not payed</span>} </p>
      <Link to=""><button onClick={() => {
        if (window.confirm("Are you sure you are done with this table?")) {
          firebase.firestore().doc(`/bars/${user}/tables/${numTable}`).set({
            occupied: false
          }).then(() => {
            window.location.replace("/");
          }).catch(function (error) {
            console.error("Error updating documents", error);
          });
        }
      }}>CLEAR</button></Link>
    </>
  );
  return null;
}