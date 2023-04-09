import React from 'react'
import '../Styles/HomeNavbar.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';


const logo = require('../Images/logo.png');

export default function HomeNavbar() {

    const nav = useNavigate();

    return (
        <div className='homeNavbar'>
            <div className='logo-holder'><img src={logo} /><h3>IntelliFit</h3></div>
            <div className="login-buttons">
                <button onClick={() => { nav("/signin") }}>Log in</button>
                <button>Sign up</button>
            </div>
        </div>
    )
}