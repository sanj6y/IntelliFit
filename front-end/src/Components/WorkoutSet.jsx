import React from 'react'
import '../Styles/WorkoutSet.css'

export default function WorkoutSet({ workoutName, workoutContents, isDeletable, isEditable }) {
    return (
        <div className='workout-set'>
            <h2>{workoutName}</h2>
            {workoutContents.map(item => <p>{item}</p>)}
        </div>
    )
}