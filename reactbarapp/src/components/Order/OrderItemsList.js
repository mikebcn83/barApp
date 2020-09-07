import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import firebase from "@firebase/app";

import OrderItem from "./OrderItem";
import { platesTypes } from "../Menu/MenuScreen";

export default function OrderItemsList({ order }) {
  const user = localStorage.getItem("user");
  const db = firebase.firestore();

  let [orderItems, loading, error] = useCollection(
    db.collection(`/bars/${user}/orders/${order}/orderItems`)
  );

  if (error) {
    return <h4>Error: {JSON.stringify(error)}</h4>;
  }
  if (loading) {
    return <h4>Loading orders...</h4>;
  }

  return (
    <>
      <div className="orderItems" >
        {orderItems.docs.map((orderPlate) => {
            for (let i = 0; i < platesTypes.length; i++) {
              if (orderPlate.id.substring(0, 2) === platesTypes[i].substring(0, 2)) {
                return <OrderItem key={orderPlate.id} id={orderPlate.id} orderId={order} type={platesTypes[i]} {...orderPlate.data()} />
              }
            }
          })
        }
      </div>
    </>
  );
}
