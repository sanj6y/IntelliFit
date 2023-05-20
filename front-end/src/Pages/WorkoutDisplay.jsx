import React, { useRef, useEffect, useCallback, useState } from 'react'

import Sidebar from '../Components/Sidebar'

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'

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

import { useAuthState } from 'react-firebase-hooks/auth';
import CameraComponent from '../Components/CameraComponent'

import '../Styles/MainDisplay.css'
// let ex1 = { "exercises": data.exercises1, "name": data.name1, "lastUsed": data.lastUsed1 };

export default function WorkoutDisplay({ ex }) {

    const [rep, setRep] = useState(0)


    useEffect(() => {

        const workoutManager = setInterval(() => {
            for (let workout in ex["exercises"]) {
                let repNums = parseInt(ex["exercises"][workout].substring(0, ex["exercises"][workout].indexOf(" ")));
                while (rep < repNums) {
                    // do nothinn in the loop
                }

                setRep(0)
            }
        }, 100)
    }, [])

    useEffect(() => {
        setInterval(() => setRep(rep + 1), 1000)
    }, [rep])

    console.log(ex);
    return (
        <div className='workout-display-holder'>
            {/* <p>{ex["name"]}</p> */}
            <CameraComponent />
            <p>Current Rep: {rep}</p>
        </div>
    )
}
