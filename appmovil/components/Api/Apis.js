import firebase from "@firebase/app";
import "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { saveBarName, checkOrders } from "../../redux/actions/actions";
import { getUser } from "../../firebase/authFirebase";

export const _saveOrder = async (
  bar,
  id,
  order,
  user,
  total,
  table,
  barName
) => {
  const db = firebase.firestore();
  const batchOrderBar = db.batch();
  const batchOrderClient = db.batch();
  console.log("Este es el ID: " + id);
  await order.map(async (item) => {
    const collectionRef = await db
      .collection(`/bars/${bar}/orders/${id}/orderItems/`)
      .doc();
    batchOrderBar.set(collectionRef, item);
  });
  await batchOrderBar.commit();

  await order.map(async (item) => {
    const collectionRef = await db
      .collection(`/clients/${getUser()}/orders/${id}/orderItems/`)
      .doc();
    batchOrderClient.set(collectionRef, item);
  });
  await batchOrderClient.commit();

  await firebase
    .firestore()
    .doc(`/bars/${bar}/orders/${id}`)
    .set({ payed: false, total: total, user: user, bar_name: barName });

  await firebase
    .firestore()
    .doc(`/clients/${getUser()}/orders/${id}`)
    .set({ total: total, bar_name: barName, id: id });

  await firebase
    .firestore()
    .doc(`/bars/${bar}/tables/${table}`)
    .update({ occupied: true, order: id });
};

export const _useLoadMenu = (bar, menu) => {
  const [value] = useCollectionData(
    firebase.firestore().collection(`/bars/${bar.id}/menu/itemsList/${menu}`)
  );
  return value;
};

export const _getBarName = (bar, dispatch) => {
  firebase
    .firestore()
    .doc(`/bars/${bar}`)
    .get()
    .then(function (doc) {
      dispatch(saveBarName(doc.data().name));
    });
};

export const getOrders = async (dispatch) => {
  const snapshot = await firebase
    .firestore()
    .collection(`/clients/${getUser()}/orders`)
    .get();
  dispatch(checkOrders(snapshot.docs.map((doc) => doc.data())));  
};

export const getUserMenu = async (id) => {
  const snapshot = await firebase
    .firestore()
    .collection(`/clients/${getUser()}/orders/${id}/orderItems`)
    .get();
    console.log(snapshot.docs.map((doc) => doc.data()))
  return snapshot.docs.map((doc) => doc.data());  
};

// export const _useGetBars = async (user) => {
//   let array = [];

//   await firebase
//     .firestore()
//     .collection("/bars")
//     .get()
//     .then((snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         firebase
//           .firestore()
//           .collection(`/bars/${doc.id}/orders`)
//           .where("user", "==", user)
//           .get()
//           .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//               array.push(doc.data());
//               console.log(array);
//             });
//           });
//       });
//     });
// };
