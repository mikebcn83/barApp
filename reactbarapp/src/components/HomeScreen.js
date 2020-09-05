import React from "react";

import TablesList from "./TablesList";
import SideMenu from "./SideMenu";
import Header from "./Header";

export default function HomeScreen() {
    const user = localStorage.getItem("user");

    if (!user) window.location.replace("/login");

    else return (
        <>
            <Header />
            <div className="home">
                <SideMenu />
                <TablesList />
            </div>
        </>
    )
}