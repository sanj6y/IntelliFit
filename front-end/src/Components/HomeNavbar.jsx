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
                <a target="_blank" href='/signin'><button>Log in</button></a>
                <a target="_blank" href='/signup'><button>Sign up</button></a>
            </div>
        </div>
    )
}