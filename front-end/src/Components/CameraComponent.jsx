import React, { useRef, useEffect, useCallback, useState } from 'react'
import Webcam from "react-webcam"
import { post } from 'axios';
import axios from 'axios';

export default function CameraComponent() {

    const webcamRef = useRef(null);
    const [img_source, setSource] = useState(null)
    const [data, setData] = useState([])

    const captureImage = useCallback( () => {
       
        const imageSrc = webcamRef.current.getScreenshot(); // pass this into python
        // console.log(imageSrc)
        setSource(imageSrc)

        fetch('http://127.0.0.1:5000/image-receiver', {
            method:'POST',
            body: JSON.stringify(imageSrc),
            mode: 'no-cors',
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })

        // axios.post('http://127.0.0.1:5000/image-receiver', { baseString: imageSrc, mode: 'cors'})
        // .then(function (response){console.log(response.data)})
        // .catch(function (error) {
        //     alert(error)
        //     console.log(error)
        // })
    }, [webcamRef])

    useEffect( () => {
        const imageCapture = setInterval(() => {
            captureImage();
        }, 200)
        }, [])

    return (
        <div>
            <Webcam ref={webcamRef} mirrored={true} screenshotFormat='image/jpeg' width={500} />
            <img src={img_source} />
        </div>
    )
}