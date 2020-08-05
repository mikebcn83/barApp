import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomeScreen from './HomeScreen';
import TableScreen from "./TableScreen";
import "./App.css";


function App() {

  //sacamos las rutas para cada mesa con los ids de las mesas (que son numeros del 1 al x)
  let tableRoutes=[];
  if(sessionStorage.getItem("tablesLength")) {
    for (let i=0; i<sessionStorage.getItem("tablesLength"); i++){
      tableRoutes.push(<Route exact path={"/"+ Number(i+1)} component={TableScreen} key={"table"+i+1}/>);
    }
  }

  return (
      <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen}/>
        {tableRoutes}
        <Route path="/" render = {() => <div>
          <p>Wrong path, this table does not exist! 
          Make sure you typed it right or go back <a href="/">home</a> and select a table</p>
          </div>}/>
      </Switch>
    </Router>
  );
}

export default App;
