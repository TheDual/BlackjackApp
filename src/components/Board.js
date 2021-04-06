import React, { useContext, useState } from 'react';
import './Board.css';
import './Button.css';
import './FlipCard.css';
import Button from './Button';
import Score from './Score';
import Card from './Card';
import './Card.css';
import AppContext, { ACTIONS } from '../Context/AppContext'
import useInterval from 'react-useinterval'


const Board = props => {
    const { myCards, score_value, pc_score_value, handleDrawCard, pcCards, isPaused, setPaused, setPlayerFinished, playerFinished, setGameOver } = useContext(AppContext)

    const intervalRef = useInterval(() => {
        if ((pc_score_value < score_value) && pc_score_value < 21)
            handleDrawCard(ACTIONS.SET_PC_CARDS, pcCards)
        else {
            setPaused(true)
            setGameOver(true)
        }
    }, isPaused ? null : 1000)

    return (
        <div className='board'>
            <div className='cards'>
                {
                    (myCards.cards != null) && myCards.cards.map(a => <Card value={a.image} key={a.code} />)
                }
            </div>

            <Score value={score_value} />
            {
                !playerFinished ?
                    <div className='buttons'>
                        <Button onClick={() => { handleDrawCard(ACTIONS.SET_MY_CARDS, myCards) }}>Hit</Button>
                        <Button onClick={() => {
                            setPaused(false)
                            setPlayerFinished(true)
                        }}>Stand</Button>
                    </div>
                    :
                    <div className='buttons'>
                        <Button onClick={() => { window.location.reload() }}>Play Again</Button>
                    </div>
            }

        </div>
    )
}

export default Board
