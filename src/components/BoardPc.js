import React, { useContext } from 'react'
import './Board.css'
import Card from './Card'
import './Card.css'
import AppContext from '../Context/AppContext'


// const checkBack(card)

const BoardPc = ({ value }) => {
    const { pcCards } = useContext(AppContext)
    return (
        <div className='board'>
            <div className="cards">
                {(pcCards.cards != null) && pcCards.cards.slice(1).map(a => <Card value={a.image} key={a.code} />)}
                <Card value='./assets/purple_back.png' />
            </div>
        </div>
    )
}

export default BoardPc
