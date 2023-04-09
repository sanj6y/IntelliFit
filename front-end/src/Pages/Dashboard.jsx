import React, { useState } from 'react'

import Sidebar from '../Components/Sidebar'

import '../Styles/Dashboard.css'

export default function Dashboard() {

    const [name, setName] = useState("Anurag")

    return (
        <div className="dashboard-holder">
            <Sidebar />

            <div className="right-side-holder">
                <div className='name-label'><h2>Hello, {name}!</h2></div>
                <div className='top-half-holder'>
                </div>
                <div className="bottom-half-holder"></div>
            </div>
        </div >
    )
}