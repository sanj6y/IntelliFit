import React, { useRef } from 'react';
import Sidebar from '../Components/Sidebar';

import '../Styles/Settings.css'

export default function Settings() {

    const nameRef = useRef(null)

    const passRef = useRef(null)
    const passConfirmRef = useRef(null)

    return (
        <div className="settings-holder">
            <Sidebar />
            <div className="settings-content">
                <div className="name-change">
                    <h2>Name</h2>
                    <p>Change your current display name.</p>
                    <form action="">
                        <input type="text" placeholder='Enter New Name' />
                    </form>
                </div>
                <div className="change-pw">
                    <h2>Password</h2>
                    <p>Change your current password</p>

                    <form action="">
                        <input type="password" placeholder='New Password' />
                        <input type="password" placeholder='Confirm Password' />

                        <input type="submit" />
                    </form>

                </div>
            </div>
        </div>
    )
}
