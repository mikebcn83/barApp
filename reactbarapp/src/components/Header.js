import React from "react";
import "./Header.css";
import { AiFillHome } from 'react-icons/ai';

export default function Header() {


    return (
        <div className="header">
            <a href="/">
                <AiFillHome className="react-icon" /></a> <span onClick={() => {
                    localStorage.removeItem("user");
                    window.location.reload();
                }}>logout</span>
        </div>
    );
}