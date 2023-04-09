import React, { useState } from 'react'

import '../Styles/TotalTimePanel.css'

export default function TotalTimePanel() {

    const [workoutMins, setWorkoutMins] = useState(0)

    return (
        <div className="total-time-panel">
            <h2 className='total-time-label'>Total Workout Time</h2>

            <p className="workout-mins">{workoutMins} Minutes</p>
        </div>
    )
}