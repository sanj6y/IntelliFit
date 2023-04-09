import React, { useRef, useEffect, useCallback } from 'react'
import Webcam from "react-webcam"
import CameraComponent from '../Components/CameraComponent'

export default function WorkoutDisplay() {

    return (
        <div>
            <CameraComponent />
        </div>
    )
}