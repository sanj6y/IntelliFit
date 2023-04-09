import React, { useState } from 'react';

import '../Styles/WorkoutChooser.css'

export default function WorkoutChooser() {

    const [workouts, setWorkouts] = useState(['hi', 'hi', 'there', 'this']);

    return (
        <div className='workout-chooser'>
            <h2>Choose a Workout</h2>
            <select name="workout-menu" id="workout-menu">
                <option value="">Select an option</option>
                {workouts.map((obj) => {
                    console.log("hi")
                    return < option value={obj} > {obj}</option>
                })}
            </select>
        </div >
    )
}
