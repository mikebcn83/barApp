import React from "react";

import Header from "../Header";
import { useAuth } from "../../use-auth.js";
import { wrongPath } from "../../App";

import "./Settings.css";
import { Link } from "react-router-dom";
import TablesEditor from "./TablesEditor";
import UserEditor from "./UserEditor";

export default function SettingsScreen() {

    const auth = useAuth();

    const logOut = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            auth.signout();
            window.location.replace("/");

            return true;
        } else return false;
    }

    if (auth.user) {
        return (
            <>
                <Header />
                <div className="settings">
                    <UserEditor username={auth.user.displayName} />
                    <TablesEditor username={auth.user.displayName} />
                    <h3>Edit menu</h3>
                    <button className="bttn2"><Link className="buttonlink" to="/menu">GO TO MENU</Link></button>
                    <div className="hline" />
                    <button className="logout" onClick={logOut}>LOGOUT</button>
                </div>
            </>
        )
    } return wrongPath()
}