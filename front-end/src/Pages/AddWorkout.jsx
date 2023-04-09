import React, { useRef, useState, useEffect } from 'react'
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

import {
    getFirestore,
    setDoc,
    doc,
    addDoc,
    collection,
    where,
    orderBy,
    onSnapshot,
    query,
    getDocs
} from "firebase/firestore";

export default function AddWorkout() {

    const [currUser, loading] = useAuthState(auth)
    const [user, setUser] = useState('')
    const [exercises, setExercises] = useState(["", "", ""])
    const [reps, setReps] = useState([0, 0, 0])
    const [units, setUnits] = useState(['', '', ''])

    const name = useRef(null)

    const handleExChange = (event, index) => {
        let newArr = exercises;
        newArr[index] = event.target.value

        setExercises([...newArr])
    }

    const handleUnits = (event, index) => {
        let newArr = units;
        newArr[index] = event

        setUnits([...newArr])
    }

    const handleNums = (event, index) => {

        console.log(event)

        let newArr = reps;
        newArr[index] = event.target.value

        setReps([...newArr])
    }


    const submitData = async () => {
        console.log(exercises)
        console.log(reps)
        console.log(units)

        let submitObj = {
            name: name.current.value,
            lastUsed: new Date(),
        }

        for (let i = 0; i < 3; i++) {
            submitObj[exercises[i]] = reps[i] + " " + units[i]
        }

        console.log(submitObj)

        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const userDoc = await getDocs(q);
            const docID = userDoc.docs[0].id;

            try {
                await addDoc(collection(db, "users", docID, "workouts"), submitObj);
            } catch (err) {
                alert('An error occured in adding the event.')
            }

        } catch (err) {
            alert('An error had occurred while fetching the users name');
            return;

        }
    }

    return (
        <div className='workout-add-holder'>
            <input type="text" placeholder='enter name of workout' ref={name} />
            <div className="workout-select-option">
                <select value={exercises[0]} onChange={(event) => handleExChange(event, 0)}>
                    <option value="">Select an Exercise</option>
                    <option value="pushup">Pushups</option>
                    <option value="situp">Sit Ups</option>
                    <option value="squat">Squats</option>
                    <option value="lunges">Lunges</option>
                    <option value="plank">Planks</option>
                    <option value="dips">Dips</option>
                    <option value="curls">Curls</option>
                    <option value="jumping jacks">Jumping Jacks</option>
                    <option value="calf raises">Calf Raises</option>
                </select>

                <div className='number-container'>
                    <input type="number" onChange={(value) => handleNums(value, 0)} />

                    <RadioGroup onChange={(event) => handleUnits(event, 0)}>
                        <RadioButton value="r">Reps</RadioButton>
                        <RadioButton value="s">Seconds</RadioButton>
                    </RadioGroup>

                </div>
            </div>

            <div className="workout-select-option">
                <select value={exercises[1]} onChange={(event) => handleExChange(event, 1)}>
                    <option value="">Select an Exercise</option>
                    <option value="pushup">Pushups</option>
                    <option value="situp">Sit Ups</option>
                    <option value="squat">Squats</option>
                    <option value="lunges">Lunges</option>
                    <option value="plank">Planks</option>
                    <option value="dips">Dips</option>
                    <option value="curls">Curls</option>
                    <option value="jumping jacks">Jumping Jacks</option>
                    <option value="calf raises">Calf Raises</option>
                </select>

                <div className='number-container'>
                    <input type="number" onChange={(value) => handleNums(value, 1)} />

                    <RadioGroup onChange={(event) => handleUnits(event, 1)}>
                        <RadioButton value="r">Reps</RadioButton>
                        <RadioButton value="s">Seconds</RadioButton>
                    </RadioGroup>

                </div>
            </div>
            <div className="workout-select-option">
                <select value={exercises[2]} onChange={(event) => handleExChange(event, 2)}>
                    <option value="">Select an Exercise</option>
                    <option value="pushup">Pushups</option>
                    <option value="situp">Sit Ups</option>
                    <option value="squat">Squats</option>
                    <option value="lunges">Lunges</option>
                    <option value="plank">Planks</option>
                    <option value="dips">Dips</option>
                    <option value="curls">Curls</option>
                    <option value="jumping jacks">Jumping Jacks</option>
                    <option value="calf raises">Calf Raises</option>
                </select>

                <div className='number-container'>
                    <input type="number" onChange={(value) => handleNums(value, 2)} />

                    <RadioGroup onChange={(event) => handleUnits(event, 2)}>
                        <RadioButton value="r">Reps</RadioButton>
                        <RadioButton value="s">Seconds</RadioButton>
                    </RadioGroup>

                </div>
            </div>

            <button onClick={() => submitData()}>submit</button>
        </div>
    )
}