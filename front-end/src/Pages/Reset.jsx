import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, forgotPassword, logout } from "../firebase";
// import "../Styles/Reset.css";

import logo from "../logo.png"

function Reset() {
    const [email, setEmail] = useState("");
    const [currUser, loading, error] = useAuthState(auth);
    const nav = useNavigate();
    useEffect(() => {
        if (loading) {
            //Future implementation for loading screen
            return;
        }
        if (currUser) {
            nav("/dashboard");
            logout();
        }
    }, [currUser, loading]);
    return (
        <div className="holder reset">
            <div className="welcome-panel reset">
                <div className="title">
                    <img src={logo} width={85} height={55}/>
                </div>
                <div className='title-holder-holder reset'>
                    <h2>
                        Reset Password
                    </h2>
                    <hr/>
                 </div>
                <div className='welcomes reset'>
                    <input
                        value={email}
                        placeholder="E-mail"
                        type="email"
                        className="email reset"
                        onChange={(e) => setEmail(e.target.value)} />
                    <button
                        className='login reset'
                        onClick={() => forgotPassword(email)}>
                        Send Link
                    </button>
                    <div className="reset-navbar">
                        <Link to="/signin" className="forgot-password reset">
                            <span>Sign In</span>
                        </Link>
                        <Link to="/signup" className="sign-up-button">
                            <span>Sign up</span>
                        </Link>
                    </div>
                </div>
               
            </div>
        </div>
    );
}

export default Reset;