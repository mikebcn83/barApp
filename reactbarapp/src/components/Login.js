import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import firebase from "@firebase/app";

import { BsEyeFill, BsLockFill } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import "./Login.css";
import logo from "../logo.png";

export default function Login() {
    const [user, setUser] = useState()
    const [tables, setTables] = useState();

    useEffect(() => {
        setUser(localStorage.getItem("user"));
        setTables(localStorage.getItem("tables"));
    }, []); //get the values

    useEffect(() => {
        if (user && tables) {
            localStorage.setItem("user", user);
            localStorage.setItem("tables", tables);
        }
    }, [user, tables]); //save the values

    const [mail, setMail] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const db = firebase.firestore();

    const onLogin = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(mail, password);

            setUser(mail);

            await db.collection(`/bars/${mail}/tables`).get().then(doc => {
                setTables(doc.size);
            });

            window.location.replace("/");
        } catch (error) {
            alert(error.message);
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin();
    }

    return (
        <div className="login">
            <img src={logo} className="logo" alt="BarApp logo" />
            <form onSubmit={handleSubmit}>
                <label>
                    <HiOutlineMail className="react-icon" />
                    <input type="text" placeholder="E-mail" className="mail"
                        onChange={(user) =>
                            setMail(user.target.value)} required />
                </label>
                <label>
                    <BsLockFill className="react-icon" />
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
                <button type="submit" value="LOG IN">LOG IN</button>
                <Link to="/register" className="orBttn">or Register</Link>
            </form>
        </div>
    );
}


//username test: testbar@bar.com
//password test: 123456