import React, { useRef, useEffect, useCallback, useState } from 'react'
import Webcam from "react-webcam"

export default function CameraComponent() {

    const webcamRef = useRef(null);
    const [img_source, setSource] = useState(null)
    const [data, setData] = useState([])

    const [time, setTime] = useState(0);

    const captureImage = useCallback(() => {

        const imageSrc = webcamRef.current.getScreenshot(); // pass this into python
        // console.log(imageSrc)
        setSource(imageSrc)

        fetch('http://127.0.0.1:5000/image-receiver', {
            method: 'POST',
            body: JSON.stringify(imageSrc),
            mode: 'no-cors',
        })
            .then(response => console.log(response.json()))
            .catch(error => {
                console.error(error)
            })
    }, [webcamRef])

    useEffect(() => {
        const imageCapture = setInterval(() => {
            captureImage();
        }, 0)
    }, [])

    // useEffect( () => {
    //     const timeInterval = setInterval(() => {
    //         setSource(require("../res.jpg"))
    //     }, 500)
    // }, [time])

    return (
        <div>
            <Webcam ref={webcamRef} mirrored={true} screenshotFormat='image/jpeg' width={0} minScreenshotWidth={500} />

        </div>
    )
}
