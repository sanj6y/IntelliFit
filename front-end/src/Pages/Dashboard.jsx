import React, { useState, useEffect } from 'react'

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

import '../Styles/Dashboard.css'
import TotalTimePanel from '../Components/TotalTimePanel'
import WorkoutChooser from '../Components/WorkoutChooser'
import WorkoutSet from '../Components/WorkoutSet'

export default function Dashboard() {

    const nav = useNavigate();
    const [name, setName] = useState("")
    const [lastWorkouts, setLastWorkouts] = useState(['workout1', 'workout2', 'workout3', 'workout4'])

    const [allWorkouts, setAllWorkouts] = useState([])
    const [currUser, loading] = useAuthState(auth)
    const [user, setUser] = useState('')

    const fetchUserName = async () => {
        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            alert('An error had occurred while fetching the users name');
            console.log(err)
        }
    };

    const sortArray = (arr) => {
        arr = arr.sort((a, b) => {
            if (a.lastUsed > b.lastUsed) {
                return 1
            } else if (a.lastUsed < b.lastUsed) {
                return -1
            } else {
                return 0
            }
        })

        return arr;
    }

    useEffect(() => {

        if (!currUser) return nav('/');
        let allWorkoutsArr = []

        const getDefaultWorkouts = async () => {
            try {
                const q = query(
                    collection(db, "DEFAULT_WORKOUTS"),
                    orderBy("lastUsed")
                )
                const unsub = onSnapshot(q, querySnapshot => {
                    querySnapshot.forEach(workout => {
                        let data = workout.data();
                        data["isDeletable"] = false
                        data["id"] = workout.id
                        console.log(data)
                        allWorkoutsArr.push(data)
                    })

                    setAllWorkouts(allWorkoutsArr)
                    console.log(allWorkouts)
                })

                return () => unsub

            } catch (e) {
                console.error(e)
                alert("Error: could not read from database")
            }

        }

        const getUserWorkouts = async () => {
            await getDefaultWorkouts();
            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                // return userDoc.docs[0].id;
                setUser(userDoc.docs[0].id)

                if (user !== '' || user !== undefined) {
                    const q = query(collection(db, 'users', user, 'workouts'), orderBy("day"))
                    const unsub = onSnapshot(q, (querySnapshot) => {
                        querySnapshot.forEach(workout => {
                            let data = workout.data();
                            data["isDeletable"] = true
                            allWorkoutsArr.push(data);
                        })
                        allWorkoutsArr = sortArray(allWorkoutsArr)
                        setAllWorkouts(allWorkoutsArr)
                    })

                    return () => unsub
                }

            } catch (err) {
                return;
            }
        }

        getUserWorkouts()
        fetchUserName();

    }, [currUser])

    return (
        <div className="dashboard-holder">
            <Sidebar />

            <div className="right-side-holder">
                <div className='name-label'>
                    <h2>Welcome, {name.indexOf(" ") !== -1 ? name.substring(0, name.indexOf(" ")) : name}!</h2>
                </div>
                <div className='top-half-holder'>
                    <TotalTimePanel />
                    <WorkoutChooser />
                </div>
                <div className="bottom-half-holder">
                    {allWorkouts.map(workout => {
                        return <WorkoutSet name={workout.name} workout={workout.exercises} isDeletable={workout.isDeletable} docID={workout.id} />
                    })}
                </div>
            </div>
        </div >
    )
}