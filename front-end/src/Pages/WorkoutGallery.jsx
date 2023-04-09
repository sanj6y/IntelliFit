import React, { useState, useEffect } from 'react'

import Sidebar from '../Components/Sidebar';

import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'

import {
    collection,
    where,
    query,
    getDocs
} from "firebase/firestore";

import { useAuthState } from 'react-firebase-hooks/auth';

import '../Styles/Dashboard.css'
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

    

    return (
       
        <div className="gallery-holder">
            <Sidebar />
            {allOfWorkouts.length !== 0 ? allOfWorkouts.map(workout => {
                return <WorkoutSet name={workout.name} workout={workout.exercises} isDeletable={workout.isDeletable} docID={workout.id} />
            }): <></>}
        </div>
    )
}