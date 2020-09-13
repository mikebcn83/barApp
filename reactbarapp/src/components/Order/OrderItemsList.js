import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

export default function OrderItemsList({ orderId, username }) {

  let [orderItems, loading, error] = useCollection(
    firebase.firestore().collection(`/bars/${username}/orders/${orderId}/orderItems`)
  );

  if (error) {
    return <h4>Error: {JSON.stringify(error)}</h4>;
  }
  if (loading) {
    return null;
  }

  return (
    <>
      <div className="orderItems" >
        {orderItems.docs.map((orderPlate) => {
          return (
            <label key={orderPlate.id}>
              <input type="checkbox" checked={orderPlate.data().done} onChange={() => {
                firebase.firestore().collection(`/bars/${username}/orders/${orderId}/orderItems`).doc(orderPlate.id).update({
                  done: !orderPlate.data().done
                })
              }} />
              <span className="plate">{orderPlate.data().name}</span>
              <span className="redS" /> {orderPlate.data().price}€
              {orderPlate.data().notes ? <p><span className="redS" />{orderPlate.data().notes}</p> : undefined}
            </label>)
        })
        }
      </div>
    </>
  );
}
