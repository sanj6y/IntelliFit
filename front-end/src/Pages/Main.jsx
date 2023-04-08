import React, { useRef, useEffect } from 'react'
import Webcam from "react-webcam"

export default function Main() {
    return (
        <div>
            <Webcam mirrored={true} />
        </div>
    )
}