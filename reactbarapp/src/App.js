import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { ProvideAuth } from "./use-auth.js";
import HomeScreen from './components/Home/HomeScreen';
import Login from "./components/Login";
import Register from "./components/Register";
import SettingsScreen from "./components/Settings/SettingsScreen";
import { MenuScreen } from "./components/Menu/MenuScreen";

import "./App.css";

export const wrongPath = () => {
  return (<div>
    <p>Wrong path, this page does not exist!
Make sure you typed it right or go back <Link to="/">home</Link> and select an option</p>
  </div>);
}

export function App() {

  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/settings" component={SettingsScreen} />
          <Route exact path="/menu" component={MenuScreen} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/" render={() => wrongPath()} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
}