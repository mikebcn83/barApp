import React, { useState, useRef } from "react";
import firebase from "@firebase/app";

import { useAuth } from "../../use-auth";
import PlatesList from "./PlatesList";

import "./Menu.css";

export default function PlateForm({ type }) {

    const auth = useAuth();
    const storage = firebase.storage();
    let user, imagesRef = null;
    if (auth.user) {
        user = auth.user.displayName;
        imagesRef = storage.ref().child(`${auth.user.displayName}/platesimages`);
    }

    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const ingredientsRef = useRef(null);
    const imageRef = useRef(null);

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [ingredients, setIngredients] = useState();
    const [imageUri, setImageUri] = useState();

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
        firebase.firestore().doc(`/bars/${user}/menu/itemsList/${type}/${id}`).set({
            name,
            price,
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

    if (user) return (<>
        <PlatesList type={type} />
        <form onSubmit={(e) => {
            e.preventDefault();
            registerPlate(randomId(type), type, name, price, ingredients);
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
    return null;
}
