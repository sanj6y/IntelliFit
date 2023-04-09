import React, { useState } from 'react'

import Sidebar from '../Components/Sidebar'

import '../Styles/Dashboard.css'
import TotalTimePanel from '../Components/TotalTimePanel'
import WorkoutChooser from '../Components/WorkoutChooser'
import WorkoutSet from '../Components/WorkoutSet'

export default function Dashboard() {

    const [name, setName] = useState("Anurag")
    const [lastWorkouts, setLastWorkouts] = useState(['workout1', 'workout2', 'workout3', 'workout4'])

    return (
        <div className="dashboard-holder">
            <Sidebar />

            <div className="right-side-holder">
                <div className='name-label'><h2>Hello, {name}!</h2></div>
                <div className='top-half-holder'>
                    <TotalTimePanel />
                    <WorkoutChooser />
                </div>
                <div className="bottom-half-holder">
                    {lastWorkouts.map(workout => {
                        return <WorkoutSet workoutName={workout} workoutContents={['ex 1', 'ex 2', 'ex 3']} />
                    })}
                </div>
            </div>
        </div >
    )
}