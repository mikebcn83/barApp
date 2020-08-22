import React, { useState, useContext } from "react";
import "./Login.css";
import logo from "../logo.png"
import firebase from "@firebase/app";
import { BsEyeFill, BsLockFill } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import TablesContext from '../TablesContext';

export default function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { setNumTables } = useContext(TablesContext);

    const db = firebase.firestore();

    const login = () => {
        if (email != null && password != null) {
            db.collection('bars').doc(email).get()
                .then((doc) => {
                    if (doc.exists) {
                        if (doc.data().password === password) {
                            localStorage.setItem("user", email); /*guardamos el user en el localstorage para que
                                                                /se quede si cambiamos de ventana/cerramos el navegador*/

                            db.collection(`/bars/${email}/tables`).get().then(snap => {
                                let size = snap.size;
                                setNumTables(size);
                            });
                        }
                        else alert("wrong password");
                    }
                    else {
                        alert("no account with this e-mail");
                    }
                });
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="login">
            <img src={logo} className="logo" alt="BarApp logo" />
            <form onSubmit={handleSubmit}>
                <label>
                    <HiOutlineMail className="react-icon" />
                    <input type="text" placeholder="E-mail" className="mail"
                        onChange={(email) =>
                            setEmail(email.target.value)} required />
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
                <button type="submit" value="LOG IN" onClick={(() => {
                    login();
                })}>LOG IN</button>
            </form>
        </div>
    );
}

//username test: testbar@bar.com
//password test: 12345
