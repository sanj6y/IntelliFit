import React from 'react'
import '../Styles/Home.css'

import { TypeAnimation } from "react-type-animation"

const img = require('../logo-no-background.png');

export default function Home() {
    return (
        <div>
            <img src={img} className="logo-image" />
        </div>
    )
}