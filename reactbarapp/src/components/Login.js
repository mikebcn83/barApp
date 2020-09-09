import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../use-auth.js";

import { BsEyeFill, BsLockFill } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import "./Login.css";
import logo from "../logo.png";

export default function Login() {
    const auth = useAuth();
    const passwordRef = useRef(null);

    const [mail, setMail] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const onLogin = async () => {
        try {
            await auth.signin(mail, password);
            window.location.replace("/");
        } catch (error) {
            alert(error.message);
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin();
    }

    if (!auth.user) return (
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
                <button type="submit" value="LOG IN">LOG IN</button>
                <Link to="/register" className="orBttn">or Register</Link>
            </form>
        </div>
    );
    window.location.replace("/");
    return null;
}