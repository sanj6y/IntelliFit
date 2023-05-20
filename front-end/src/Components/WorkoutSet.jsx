import React from 'react'
import '../Styles/WorkoutSet.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
export default function WorkoutSet({ name, workout, isDeletable, docID }) {
    return (
        <div className='workout-set'>
            <h2>{name}</h2>
            {Object.keys(workout).map(key => {
                return <p>{workout[key].substring(0, workout[key].indexOf(" "))} {workout[key].charAt(workout[key].indexOf(" ") + 1) === 'r' ? "Reps" : "Seconds"}: {key}</p>
            })}
            <Link to={{
                pathname: "/workout",
                state: { workout } // your data array of objects
            }}>start</Link>
        </div>
    )
}