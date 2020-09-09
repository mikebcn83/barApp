import React, { useState } from "react";

import Header from "../Header";
import PlateForm from "./PlateForm";
import { useAuth } from "../../use-auth";

import "./Menu.css";
import { wrongPath } from "../../App";

export const platesTypes = ["starters", "main", "desserts", "drinks"];

export const MenuScreen = () => {

    const auth = useAuth();

    const [showStarters, setShowStarters] = useState(true);
    const [showMain, setShowMain] = useState(false);
    const [showDesserts, setShowDesserts] = useState(false);
    const [showDrinks, setShowDrinks] = useState(false);

    if (auth.user) {
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
                        }} className={showStarters ? "selected" : undefined}>
                            {platesTypes[0].charAt(0).toUpperCase() + platesTypes[0].slice(1)}</li><span className="redS" />
                        <li onClick={() => {
                            setShowStarters(false);
                            setShowMain(!showMain);
                            setShowDesserts(false);
                            setShowDrinks(false);
                        }} className={showMain ? "selected" : undefined}>
                            {platesTypes[1].charAt(0).toUpperCase() + platesTypes[1].slice(1)}</li><span className="redS" />
                        <li onClick={() => {
                            setShowStarters(false);
                            setShowMain(false);
                            setShowDesserts(!showDesserts);
                            setShowDrinks(false);
                        }} className={showDesserts ? "selected" : undefined}>
                            {platesTypes[2].charAt(0).toUpperCase() + platesTypes[2].slice(1)}</li><span className="redS" />
                        <li onClick={() => {
                            setShowStarters(false);
                            setShowMain(false);
                            setShowDesserts(false);
                            setShowDrinks(!showDrinks);
                        }} className={showDrinks ? "selected" : undefined}>
                            {platesTypes[3].charAt(0).toUpperCase() + platesTypes[3].slice(1)}</li>
                    </ul>

                    {showStarters && <PlateForm type={platesTypes[0]} />}
                    {showMain && <PlateForm type={platesTypes[1]} />}
                    {showDesserts && <PlateForm type={platesTypes[2]} />}
                    {showDrinks && <PlateForm type={platesTypes[3]} />}
                </div>
            </>
        )
    } return wrongPath()

}