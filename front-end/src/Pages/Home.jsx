import React, { useState, useEffect } from 'react'
import '../Styles/Home.css'
import AboutComponent from '../Components/AboutComponent';
import HomeNavbar from '../Components/HomeNavbar';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { TypeAnimation } from "react-type-animation"
import { auth, db } from '../firebase'
const placeholder = require('../Images/placeholder.png')

export default function Home() {

    const nav = useNavigate();
    const [currUser, loading] = useAuthState(auth)


    useEffect(() => {

        if (!currUser) return nav('/');
        if(currUser){
            return nav('/dashboard')
        }
    }, [currUser])

    return (
        <div className="home-holder">
            <HomeNavbar />
            <div className="image-slogan">
                <h1>IntelliFit</h1>
                <TypeAnimation sequence={[' Revolutionizing Workouts.', 100]} className='sloganText' />
            </div>

            <AboutComponent img={placeholder} title="A New Way to Visualize Workouts" content="IntelliFit uses OpenVC to blah blah blah i like men i like men i like men i like men i like men" leftImage={true} />
            <AboutComponent img={placeholder} title="A New Way to Visualize Workouts" content="IntelliFit uses OpenVC to blah blah blah i like men i like men i like men i like men i like men" leftImage={false} />
            <AboutComponent img={placeholder} title="A New Way to Visualize Workouts" content="IntelliFit uses OpenVC to blah blah blah i like men i like men i like men i like men i like men" leftImage={true} />
        </div>
    )
}