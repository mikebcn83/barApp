import React, { useState, useRef } from "react";
import firebase from "@firebase/app";

import { useAuth } from "../use-auth";
import { wrongPath } from "../App";

import { BsEyeFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {

    const auth = useAuth();

    const passwordRef = useRef(null);
    const usernameRef = useRef(null);

    const [mail, setMail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState(null);
    const [adress, setAdress] = useState(null);
    const [tables, setTables] = useState(null);

    const onRegister = () => {
        try {
            firebase.firestore().doc(`/bars/${username}`).get().then(async (doc) => {
                if (!doc.exists) {

                    await auth.signup(mail, password);
                    await auth.updateProfile(username);

                    await firebase.firestore().doc(`/bars/${username}`).set({
                        name,
                        adress
                    }).then(async () => {
                        for (let i = 0; i < tables; i++) {
                            await firebase.firestore().doc(`/bars/${username}/tables/${i + 1}`).set({
                                occupied: false
                            });
                        }
                        window.location.replace("/menu");
                    });

                } else alert("This username already exists! Please choose another one")
            })
        } catch (e) {
            alert(e.message);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onRegister();
    }

    if (!auth.user) return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <h3>Account data</h3>
                <label>
                    <input type="text" placeholder="E-mail"
                        onChange={(mail) =>
                            setMail(mail.target.value)} required />
                </label>
                <label>
                    <input type="text" minLength="8" placeholder="Username" ref={usernameRef}
                        onChange={(un) => { //filtro para que no tenga cosas raras
                            let characters = '_@.-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                            if (un.target.value.length > 0) {
                                if (characters.includes(un.target.value.substr(un.target.value.length - 1))) {
                                    setUsername(un.target.value)
                                } else usernameRef.current.value = username;
                            }
                        }} required />
                </label>
                <label>
                    <input id="password" type="password" placeholder="Password" ref={passwordRef} onChange={(password) =>
                        setPassword(password.target.value)} required />
                    <BsEyeFill className={showPassword ? "red" : "gray"} onClick={(() => {
                        if (passwordRef.current.type === "password") {
                            passwordRef.current.type = "text";
                        } else {
                            passwordRef.current.type = "password";
                        }
                        setShowPassword(!showPassword);
                    })} />
                </label>
                <h3>Bar data</h3>
                <label>
                    <input type="text" placeholder="Bar name"
                        onChange={(name) =>
                            setName(name.target.value)} required />
                </label>
                <label>
                    <input type="text" placeholder="Adress"
                        onChange={(adress) =>
                            setAdress(adress.target.value)} required />
                </label>
                <label>
                    <input type="number" min="1" max="20" placeholder="Number of tables"
                        onChange={(tables) =>
                            setTables(tables.target.value)} required />
                </label>
                <button type="submit" value="REGISTER">REGISTER</button>
                <Link to="/login" className="orBttn">or Log in</Link>
            </form>
        </div>
    );
    return wrongPath();
}
