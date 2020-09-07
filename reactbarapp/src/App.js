import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import HomeScreen from './components/Home/HomeScreen';
import Login from "./components/Login";
import Register from "./components/Register";
import SettingsScreen from "./components/Settings/SettingsScreen";
import OrderScreen from "./components/Order/OrderScreen";
import { MenuScreen } from "./components/Menu/MenuScreen";

import "./App.css";

function App() {
  const user = localStorage.getItem("user");
  const tables = localStorage.getItem("tables");

  //(si ha iniciado sesión) sacamos las rutas para cada mesa con los ids 
  //de las mesas (que son numeros del 1 al x)
  let tableRoutes = [];
  if (user && tables) {
    for (let i = 0; i < tables; i++) {
      tableRoutes.push(<Route exact path={"/" + Number(i + 1)} component={OrderScreen} key={"table" + i + 1} props />);
    }
  }

  const wrongPath = () => {
    return (<div>
      <p>Wrong path, this page does not exist!
    Make sure you typed it right or go back <Link to="/">home</Link> and select an option</p>
    </div>);
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/login" render={() => !user ? <Login /> : <Login />} />
        <Route exact path="/register" render={() => !user ? <Register /> : wrongPath()} />
        <Route exact path="/settings" render={() => user ? <SettingsScreen /> : wrongPath()} />
        <Route exact path="/menu" render={() => user ? <MenuScreen /> : wrongPath()} />
        {tableRoutes}
        <Route path="/" render={() => wrongPath()} />
      </Switch>
    </Router>
  );
}

export default App;
