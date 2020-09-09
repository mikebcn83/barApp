import React from "react";

import { useAuth } from "../../use-auth.js";
import TablesList from "./TablesList";
import SideMenu from "./SideMenu";
import Header from "../Header";
import OrderScreen from "../Order/OrderScreen.js";

export default function HomeScreen() {
    const auth = useAuth();

    if (auth.user !== null) {
        if (!auth.user) window.location.replace("/login");

        else if (!window.location.href.includes("?table=")) {
            return (
                <>
                    <Header />
                    <div className="home">
                        <SideMenu />
                        <TablesList />
                    </div>
                </>
            )
        } return (<OrderScreen />)

    } return null;
}

