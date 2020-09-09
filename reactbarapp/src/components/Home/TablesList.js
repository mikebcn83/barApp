import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";

import { useAuth } from "../../use-auth";
import { Link } from "react-router-dom";

import './TablesList.css';

//component table para acceder a la mesa (si está ocupada)
//(muestra el numero de la mesa y el color según esté ocupada o no)
const Table = ({ numTable, occupied }) => {
  if (occupied) return (
    <Link to={`?table=${numTable}`} className={"occupied table"}>
      {numTable}</Link> //le pasamos el order para tener la referencia
  );

  return <p className={"free table"}>{numTable}</p>
}

export default function Tables() {

  const auth = useAuth();
  let user = null;
  if (auth.user) user = auth.user.displayName;

  //cargamos las mesas
  const [tables, loading, error] = useCollection(firebase.firestore().collection(`/bars/${user}/tables`));

  if (error) {
    return <h4>Error: {error.toString()}</h4>;
  }
  if (loading) {
    return <div className="loading"><img alt="loading" src="https://ccps.aemps.es/ccps/images/loader.gif" /></div>;
  }

  if (tables) {
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
  } return null
}
