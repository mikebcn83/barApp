import React, { useState } from "react";
import firebase from "@firebase/app";

import { BsEyeFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
    const [mail, setMail] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState(null);
    const [adress, setAdress] = useState(null);
    const [tables, setTables] = useState(null);

    const db = firebase.firestore();

    const onRegister = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(mail, password);
            firebase.auth().currentUser.updateProfile({
                displayName: name
            });

            await firebase.auth().signInWithEmailAndPassword(mail, password);

            await db.doc(`/bars/${mail}`).set({
                name,
                adress
            });

            for (let i = 0; i < tables; i++) {
                await db.doc(`/bars/${mail}/tables/${i + 1}`).set({
                    occupied: false
                });
            }
            localStorage.setItem("user", mail);
            localStorage.setItem("tables", tables);

            window.location.replace("/menu");
        } catch (e) {
            alert(e.message);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onRegister();
    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" placeholder="E-mail"
                        onChange={(mail) =>
                            setMail(mail.target.value)} required />
                </label>
                <label>
                    <input id="password" type="password" placeholder="Password" onChange={(password) =>
                        setPassword(password.target.value)} required />
                    <BsEyeFill className={showPassword ? "red" : "gray"} onClick={(() => {
                        let x = document.getElementById("password");
                        if (x.type === "password") {
                            x.type = "text";
                        } else {
                            x.type = "password";
                        }
                        setShowPassword(!showPassword);
                    })} />
                </label>
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
                    <input type="number" placeholder="Number of tables"
                        onChange={(tables) =>
                            setTables(tables.target.value)} required />
                </label>
                <button type="submit" value="REGISTER">REGISTER</button>
                <Link to="/login" className="orBttn">or Log in</Link>
            </form>
        </div>
    );
}
