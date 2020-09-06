import React, { useState, useRef } from "react";
import firebase from "@firebase/app";

import PlatesList from "./PlatesList";

import { AiFillPlusCircle } from 'react-icons/ai';
import "./Menu.css";

export default function PlateForm({ category }) {

    const user = localStorage.getItem("user");
    const nameRef = useRef(null);
    const priceRef = useRef(null);

    const [name, setName] = useState();
    const [price, setPrice] = useState();


    const randomId = () => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (var i = 0; i < 20; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const registerPlate = (id, type, name, price) => {
        firebase.firestore().doc(`/bars/${user}/menu/itemsList/${type}/${id}`).set({
            name,
            price
        }).catch(e => {
            alert(e.message);
        });
    }


    return (<>
        <PlatesList category={category} />

        <form onSubmit={(e) => {
            e.preventDefault();
            registerPlate(randomId(), category, name, price);
            nameRef.current.value = '';
            priceRef.current.value = '';
        }}>
            <label>Add a plate:</label>
            <label>
                <input type="text" placeholder="Plate name" ref={nameRef} onChange={(name) =>
                    setName(name.target.value)} required /><span className="redS" />
                <input type="number" placeholder="price" ref={priceRef} onChange={(price) =>
                    setPrice(price.target.value)} required /> €
                            <button className="plus" type="submit"><AiFillPlusCircle className="react-icon" /></button>
            </label>
        </form>
    </>
    );
}