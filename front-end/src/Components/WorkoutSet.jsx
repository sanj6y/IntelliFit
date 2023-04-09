import React from 'react'
import '../Styles/WorkoutSet.css'

export default function WorkoutSet({ name, workout }) {
    return (
        <div className='workout-set'>
            <h2>{name}</h2>
            {Object.keys(workout).map(key => {
                return <p>{workout[key]}</p>
            })}
        </div>
    )
}