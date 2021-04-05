import React, { useContext, useState } from 'react';
import './Board.css';
import './Button.css';
import Button from './Button';
import Score from './Score';
import Card from './Card';
import './Card.css';
import AppContext, { ACTIONS } from '../Context/AppContext'
import useInterval from 'react-useinterval'

var res = null
const Board = props => {
    const { myCards, score_value, pc_score_value, handleDrawCard, pcCards, isPaused, setPaused } = useContext(AppContext)

    const intervalRef = useInterval(() => {
        if ((pc_score_value < 17) && (pc_score_value < score_value))
            handleDrawCard(ACTIONS.SET_PC_CARDS, pcCards)
        else {
            setPaused(true)
            console.log("dDDsa")
        }

    }, isPaused ? null : 1500)


    return (
        <div className='board'>
            <div className='cards'>
                {
                    (myCards.cards != null) && myCards.cards.map(a => <Card value={a.image} key={a.code} />)
                }
            </div>

            <Score value={score_value} />

            <div className='buttons'>
                <Button onClick={() => { handleDrawCard(ACTIONS.SET_MY_CARDS, myCards) }}>Hit</Button>
                <Button onClick={() => { setPaused(!isPaused) }}>Stand</Button>
            </div>
        </div >
    )
}

export default Board
