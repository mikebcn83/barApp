import React, { useState, useRef } from "react";
import firebase from "@firebase/app";

import PlatesList from "./PlatesList";

import "./Menu.css";

export default function PlateForm({ type, username }) {

    const imagesRef = firebase.storage().ref().child(`${username}/platesimages`);

    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const ingredientsRef = useRef(null);
    const imageRef = useRef(null);

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [ingredients, setIngredients] = useState();
    const [imageUri, setImageUri] = useState();

    const randomId = () => {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        let result = "";
        for (var i = 0; i < 20; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const registerPlate = (id, type, name, price, ingredients) => {
        let numPrice = Number(price);
        firebase.firestore().doc(`/bars/${username}/menu/itemsList/${type}/${id}`).set({
            name,
            numPrice,
            ingredients,
            imageUri
        }).catch(e => {
            alert(e.message);
        });
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            imagesRef.child(e.target.files[0].name).put(e.target.files[0]).then(function (snapshot) {
                snapshot.ref.getDownloadURL().then(url => {
                    setImageUri(url);
                })
            });
        }
    };

    return (
        <>
            <PlatesList type={type} username={username} />
            <form onSubmit={(e) => {
                e.preventDefault();
                registerPlate(randomId(), type, name, price, ingredients);
                nameRef.current.value = '';
                priceRef.current.value = '';
                ingredientsRef.current.value = '';
                imageRef.current.value = '';
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
                <label className="laimage">
                    Plate image
            </label>
                <input className="inimage" type="file" onChange={handleChange} ref={imageRef} />
                <button type="submit">ADD</button>
            </form>
        </>
    );
}
