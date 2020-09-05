import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

import { Link } from "react-router-dom";

import './TablesList.css'

//component table para acceder a la mesa (si está ocupada)
//(muestra el numero de la mesa y el color según esté ocupada o no)
const Table = ({ numTable, occupied, order }) => {
  if (occupied) return (
    <Link to={`/${numTable}`} className={"occupied table"}>
      {numTable}</Link> //le pasamos el order para tener la referencia
  );

  return <p className={"free table"}>{numTable}</p>
}

export default function Tables() {

  const user = localStorage.getItem("user");

  //cargamos las mesas
  const db = firebase.firestore();
  const [tables, loading, error] = useCollection(db.collection(`/bars/${user}/tables`));

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading) {
    return <div>Loading tables...</div>;
  }

  return (
    <div>
      <h1>Tables</h1>
      <div className="tables">
        {tables.docs.map((table) => {
          const fields = table.data();
          return (
            <Table key={table.id} numTable={table.id} occupied={fields.occupied} order={fields.order} />
          );
        })}
      </div>
    </div>
  );
}
