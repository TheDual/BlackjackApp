import React from 'react'
import './Card.css'

const Card = props => {
    return (
        <div className={`card ${props.className}`}>
            <img src={props.value} alt="Card" />
        </div>
    )
}

export default Card

