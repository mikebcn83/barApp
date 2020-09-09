import React, { useState, useRef } from "react";
import firebase from "@firebase/app";

import { useAuth } from "../../use-auth";
import PlatesList from "./PlatesList";

import "./Menu.css";

export default function PlateForm({ type }) {

    const auth = useAuth();
    let user = null;
    if (auth.user) user = auth.user.displayName;

    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const ingredientsRef = useRef(null);

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [ingredients, setIngredients] = useState();

    const randomId = (type) => {
        let result = type.substring(0, 2); /*los dos primeros chars seran las dos
                                             primeras letras del tipo de plato (para
                                             localizarlos mejor luego)*/
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (var i = 0; i < 18; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const registerPlate = (id, type, name, price, ingredients) => {
        if (user) firebase.firestore().doc(`/bars/${user}/menu/itemsList/${type}/${id}`).set({
            name,
            price,
            ingredients
        }).catch(e => {
            alert(e.message);
        });
    }


    if (user) return (<>
        <PlatesList type={type} />
        <form onSubmit={(e) => {
            e.preventDefault();
            registerPlate(randomId(type), type, name, price, ingredients);
            nameRef.current.value = '';
            priceRef.current.value = '';
            ingredientsRef.current.value = '';
        }}>
            <label>Add a plate:</label>
            <label>
                <input type="text" placeholder="Plate name" ref={nameRef} onChange={(name) =>
                    setName(name.target.value)} required /><span className="redS" />
                <input type="number" step="0.01" placeholder="price" ref={priceRef} onChange={(price) =>
                    setPrice(price.target.value)} required /> €
                </label>
            <textarea className="ingredients" type="text" placeholder="Plate description" ref={ingredientsRef} onChange={(ingredients) =>
                setIngredients(ingredients.target.value)} required />
            <button type="submit">ADD</button>
        </form>
    </>
    );
    return null;
}