import React, { useContext } from 'react'
import AppContext from '../Context/AppContext'


const FlipCard = props => {
    const { playerFinished } = useContext(AppContext)
    return (
        <div className={`flip-card ${playerFinished && 'flip-card-active'}`}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src="./assets/purple_back.png" alt="card_back" />
                </div>
                <div className="flip-card-back">
                    <img src={props.value} alt="card_back" />
                </div>
            </div>
        </div>
    )
}

export default FlipCard
