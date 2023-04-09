
import React, { useRef, useEffect, useCallback, useState } from 'react'
import Webcam from "react-webcam"

export default function CameraComponent() {

    const webcamRef = useRef(null);
    const [img_source, setSource] = useState(null)

    const captureImage = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot(); // pass this into python
        setSource(imageSrc)
    }, [webcamRef])

    useEffect(() => {

        const imageCapture = setInterval(() => {
            captureImage();
        }, 20)

    }, [])

    return (
        <div>
            <Webcam ref={webcamRef} mirrored={true} screenshotFormat='image/jpeg' width={500} />
            <img src={img_source} />
        </div>
    )
}