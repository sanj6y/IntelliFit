import React from 'react'

export default function AboutComponent({ img, title, content, leftImage }) {
    return (
        <div className="about-holder">
            <h2>{title}</h2>
            <div className={leftImage ? "about-component left" : "about-component right"}>
                <img src={img} />
                <p>{content}</p>
            </div>
        </div>
    )
}