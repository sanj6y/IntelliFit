import React from 'react'
import '../Styles/Sidebar.css'

const img = require("../Images/logo.png")

export default function Sidebar() {


    return (
        <div className="sidebar">
            <div className='logoText'>
                <img className="sidebar-logo-img" src={img} />
                <h3>IntelliFit</h3>
            </div>

            <div className='nav-buttons'>
                <button>Home</button>
                <button>Create A Workout</button>
                <button>Stats</button>
                <button>All Workouts</button>
                <button>Settings</button>
            </div>

            <button className='logout-button'>Logout</button>
        </div>
    )
}