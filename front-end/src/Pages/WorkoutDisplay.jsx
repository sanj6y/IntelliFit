import React, { useRef, useEffect, useCallback } from 'react'
import Webcam from "react-webcam"
import CameraComponent from '../Components/CameraComponent'
import Navbar from '../Components/Navbar'

export default function WorkoutDisplay() {

    return (
        <div>
            <CameraComponent />
        </div>
    )
}