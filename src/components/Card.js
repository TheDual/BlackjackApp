import React from 'react'
import './Card.css'
import { SingleCard, CardImage } from './styled'


const Card = ({ value }) => {
    return (
        <div className='card'>
            <img src={value} alt="Card" />
        </div>
    )
}

export default Card

