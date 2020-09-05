import React from "react";

import { AiFillHome } from 'react-icons/ai';
import { RiSettings4Fill } from 'react-icons/ri';
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <div className="header">
            <Link to="/">
                <AiFillHome className="react-icon" /></Link>
            <div>
                <Link to="/settings">
                    <RiSettings4Fill className="react-icon" /></Link>
            </div>
        </div>
    );
}