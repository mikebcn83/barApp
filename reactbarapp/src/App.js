import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import OrderScreen from "./components/OrderScreen";
import "./App.css";
import TablesContext from './TablesContext';
import firebase from "@firebase/app";


function App() {
  const [numTables, setNumTables] = useState(null);
  const db = firebase.firestore();


  //asignamos ya el numTables porque sino cada vez que refresque estará en null
  //además ya tenemos el user guardado en local (si ha iniciado sesión)
  if (localStorage.getItem("user")) {
    db.collection(`/bars/${localStorage.getItem("user")}/tables`).get().then(snap => {
      let size = snap.size;
      setNumTables(size);
    });
  }

  //sacamos las rutas para cada mesa con los ids de las mesas (que son numeros del 1 al x)
  let tableRoutes = [];
  if (numTables != null) {
    for (let i = 0; i < numTables; i++) {
      tableRoutes.push(<Route exact path={"/" + Number(i + 1)} state={numTables} component={OrderScreen} key={"table" + i + 1} />);
    }
  }

  return (
    <TablesContext.Provider value={{ numTables, setNumTables }}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          {tableRoutes}
          <Route path="/" render={() => <div>
            <p>Wrong path, this table does not exist!
          Make sure you typed it right or go back <a href="/">home</a> and select a table</p>
          </div>} />
        </Switch>
      </Router>
    </TablesContext.Provider>
  );
}

export default App;
