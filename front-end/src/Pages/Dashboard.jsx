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
    const [allOfWorkouts, setAllOfWorkouts] = useState([])
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

    const fetchDefaultWorkouts = async () => {
        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const doc = await getDocs(q);
            const data = doc.docs[0].data();

            let ex1 = {"exercises": data.exercises1, "name": data.name1, "lastUsed":data.lastUsed1};
            let ex2 = {"exercises": data.exercises2, "name": data.name2, "lastUsed":data.lastUsed2};
            let ex3 = {"exercises": data.exercises1, "name": data.name1, "lastUsed":data.lastUsed1};
            let arr = [ex1, ex2, ex3]
            setAllOfWorkouts([...arr])

            
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
        fetchUserName();
        fetchDefaultWorkouts();
    }, [currUser])

    // useEffect(() => {

    //     if (!currUser) return nav('/');
    //     let allWorkoutsArr = []


    //     const getUserWorkouts = async () => {
    //         try {
    //             const q = query(
    //                 collection(db, 'users'),
    //                 where('uid', '==', currUser?.uid)
    //             );
    //             const userDoc = await getDocs(q);
    //             setUser(userDoc.docs[0].id)

    //             if (user !== undefined) {
    //                 console.log("sdf") 
    //                 const q = query(collection(db, 'users', user, 'workouts'))
    //                 console.log("hello there")
    //                 let tempData = []
    //                 const unsub = onSnapshot(q, (querySnapshot) => {
    //                     querySnapshot.forEach(workout => {
    //                         let data = workout.data();
    //                         data["isDeletable"] = true
    //                         tempData.push(data);
    //                     })

    //                     console.log(tempData + " sdfs")
    //                     setAllOfWorkouts([...tempData])
    //                 })

    //                 return () => unsub
    //             }

    //         } catch (err) {
    //             return;
    //         }
    //     }

    //     if(currUser && allOfWorkouts.length!== 0){
    //         console.log(allOfWorkouts)
    //         console.log(currUser) 
    //         getUserWorkouts();
    //         console.log(allOfWorkouts)
    //     }

    // }, [ currUser, allOfWorkouts])

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
                    {allOfWorkouts.length !== 0 ? allOfWorkouts.map(workout => {
                        return <WorkoutSet name={workout.name} workout={workout.exercises} isDeletable={workout.isDeletable} docID={workout.id} />
                    }): <></>}
                </div>
            </div>
        </div >
    )
}