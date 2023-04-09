import React from 'react'
import '../Styles/WorkoutSet.css'

export default function WorkoutSet({ name, workout, isDeletable, docID }) {
    return (
        <div className='workout-set'>
            <h2>{name} {docID + ""} </h2>
            {Object.keys(workout).map(key => {
                return <p>{workout[key].substring(0, workout[key].indexOf(" "))} {workout[key].charAt(workout[key].indexOf(" ") + 1) === 'r' ? "Reps" : "Seconds"}</p>
            })}
        </div>
    )
}