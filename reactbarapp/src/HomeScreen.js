import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "@firebase/app";
import AddOrder from "./components/AddOrder";

//component table para acceder a la mesa (si está ocupada)
//(muestra el numero de la mesa y el color según esté ocupada o no)
const Table = ({numTable, occupied}) => { 
  if(occupied) return <a href={"/" + numTable} className={"occupied table"}>
    {numTable}</a>;

    return <p className={"free table"}>{numTable}</p>
}

export default function HomeScreen() {

  //cargamos las mesas
  const db = firebase.firestore();
  const [tables, loading, error] = useCollection(db.collection("/bars/testbar/tables"));

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  //guardamos el numero de mesas para poder hacer las rutas a cada una
  sessionStorage.setItem("tablesLength", tables.docs.length);

  return (
    <>
      <h1>Tables</h1>
      <div className="tables">
      {tables.docs.map((table) => {
        const fields = table.data();        
        return (
          <Table key={table.id} numTable={table.id} occupied={fields.occupied}>
            {table.id} 
          </Table>
        );
      })}
      </div>
      
      <AddOrder key="a"/>
    </>
  );
}
