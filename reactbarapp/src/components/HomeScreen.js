import React from "react";
import Login from "./Login";
import TablesList from "./TablesList";
import SideMenu from "./SideMenu";
import Header from "./Header"

export default function HomeScreen() {
    const user = localStorage.getItem("user");

    if (user === null) return (<>
        <Login />
    </>);

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