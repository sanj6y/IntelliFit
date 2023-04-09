import React from 'react'
import '../Styles/Sidebar.css'
import logo from "../logo.png"
import { auth, db, logout } from '../firebase'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from 'react-router-dom';

const img = require("../logo.png")

export default function Sidebar() {

    const nav = useNavigate()

    return (
        <div className="sidebar">
            <div className='logoText'>
                <img src={logo} width={45} height={25} />
                <h3>IntelliFit</h3>
            </div>
            <div className='nav-buttons'>
                <button> <i class="bi bi-house-door-fill" />Home</button>
                <button><i class="bi bi-plus-square-fill" />Create A Workout</button>
                <button><i class="bi bi-clipboard2-data-fill" />All Workouts</button>
                <button><i class="bi bi-gear-fill" />Settings</button>
            </div>

            <button className='logout-button' onClick={() => { logout(); nav("/") }}><i class="bi bi-box-arrow-left" />Logout</button>
        </div>
    )
}