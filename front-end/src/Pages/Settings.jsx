import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../Components/Sidebar';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { collection, query, onSnapshot, where, getDocs, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteUser, updateEmail } from "firebase/auth";

import { useNavigate } from 'react-router-dom';


import '../Styles/Settings.css'

export default function Settings() {

    const nav = useNavigate();

    const [currUser, loading] = useAuthState(auth)
    const [user, setUser] = useState('')
    const [userDoc, setUserDoc] = useState()
    const [name, setName] = useState('');

    const nameRef = useRef(null)
    const emailRef = useRef(null)

    const currentUser = auth.currentUser

    const changeEmail = async () => {

        try {
            await updateEmail(currentUser, emailRef.current.value)
        }

        catch (e) {
            console.error("error", e);
            alert("Error: Could not update email.")
        }

        emailRef.current.value = ''
    }

    const changeName = async () => {
        const docRef = doc(db, "users", user)
        try {
            await updateDoc(docRef, { name: nameRef.current.value + "" })
            setName(nameRef.current.value + "");
        } catch (e) {
            alert("Error: Could not change name")
            console.log(e)

        }
        nameRef.current.value = ''
    }

    const deleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                await deleteUser(currentUser)
                nav("/")

            } catch (e) {
                alert("Error: Could not delete account")
                console.log(e)
            }
        }
    }

    useEffect(() => {
        const usr = async () => {
            if (currUser) {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                setUserDoc(userDoc.docs[0])
                setUser(userDoc.docs[0].id)
                setName(userDoc.docs[0].data().name)
            }
        }
        usr()

    }, [currUser])

    return (
        <div className="settings-holder">
            <Sidebar />
            <div className="settings-content">
                <div className="name-change">
                    <h2>Name</h2>
                    <p>Change your current display name.</p>
                    <form onSubmit={e => { e.preventDefault(); changeName() }}>
                        <input type="text" placeholder='Enter New Name' ref={nameRef} />
                    </form>
                </div>
                <div className="change-email">
                    <h2>Email</h2>
                    <p>Change your current email</p>

                    <form onSubmit={(e) => { e.preventDefault(); changeEmail() }}>
                        <input type="email" placeholder='New Email' ref={emailRef} />

                        <input type="submit" />
                    </form>

                </div>

                <button onClick={() => deleteAccount()}>Delete Account</button>
            </div>
        </div>
    )
}
