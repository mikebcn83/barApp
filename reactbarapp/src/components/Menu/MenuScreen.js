import React, { useState } from "react";

import Header from "../Header";
import PlateForm from "./PlateForm";

import "./Menu.css";

export const platesTypes = ["starters", "main", "desserts", "drinks"];

export const MenuScreen = () => {
    const [showStarters, setShowStarters] = useState(true);
    const [showMain, setShowMain] = useState(false);
    const [showDesserts, setShowDesserts] = useState(false);
    const [showDrinks, setShowDrinks] = useState(false);

    return (
        <>
            <Header />
            <div className="menu">
                <h2>Menu</h2>
                <ul className="categories">
                    <li onClick={() => {
                        setShowStarters(!showStarters);
                        setShowMain(false);
                        setShowDesserts(false);
                        setShowDrinks(false);
                    }} className={showStarters ? "selected" : undefined}>Starters</li><span className="redS" />
                    <li onClick={() => {
                        setShowStarters(false);
                        setShowMain(!showMain);
                        setShowDesserts(false);
                        setShowDrinks(false);
                    }} className={showMain ? "selected" : undefined}>Main</li><span className="redS" />
                    <li onClick={() => {
                        setShowStarters(false);
                        setShowMain(false);
                        setShowDesserts(!showDesserts);
                        setShowDrinks(false);
                    }} className={showDesserts ? "selected" : undefined}>Desserts</li><span className="redS" />
                    <li onClick={() => {
                        setShowStarters(false);
                        setShowMain(false);
                        setShowDesserts(false);
                        setShowDrinks(!showDrinks);
                    }} className={showDrinks ? "selected" : undefined}>Drinks</li>
                </ul>

                {showStarters && <PlateForm type={platesTypes[0]} />}
                {showMain && <PlateForm type={platesTypes[1]} />}
                {showDesserts && <PlateForm type={platesTypes[2]} />}
                {showDrinks && <PlateForm type={platesTypes[3]} />}
            </div>
        </>
    )

}