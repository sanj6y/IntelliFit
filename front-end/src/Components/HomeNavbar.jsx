import React from 'react'
import '../Styles/HomeNavbar.css'

const logo = require('../Images/logo.png');

export default function HomeNavbar() {
    return (
        <div className='homeNavbar'>
            <div className='logo-holder'><img src={logo} /><h3>IntelliFit</h3></div>
            <div className="login-buttons">
                <button>Log in</button>
                <button>Sign up</button>
            </div>
        </div>
    )
}