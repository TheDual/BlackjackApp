import React, { useContext } from 'react'
import './Board.css'
import './Card.css'
import './Outcome.css'
import Score from './Score';
import Card from './Card'
import AppContext, { getCardValue } from '../Context/AppContext'
import Outcome from './Outcome'
import FlipCard from './FlipCard'

const BoardPc = props => {
    const { pcCards, pc_score_value, gameOutcome, playerFinished } = useContext(AppContext)
    let score = () => {
        if (pcCards.cards != null) {
            if (playerFinished)
                return pc_score_value
            return pc_score_value - getCardValue(pcCards.cards[0])
        }
        return 0
    }
    const msg = () => {
        switch (gameOutcome) {
            case 0:
                return { message: ["You", "BUSTED"], className: "busted" }
            case 1:
            case 2:
                return { message: ["You", "WIN"], className: "win" }
            case 3:
                return { message: ["You", "LOSE"], className: "lose" }
            case 4:
                return { message: ["", "DRAW"], className: "draw" }
            case 5:
                return { message: ["", "BLACKJACK"], className: "blackjack" }
            default:
                return { message: "", className: "" }
        }
    }

    return (
        <div className='board'>
            {
                <Score value={score()} />
            }

            <div className="cards">
                {(pcCards.cards != null) && pcCards.cards.slice(1).map(a => <Card value={a.image} key={a.code} />)}
                <FlipCard value={pcCards.cards != null && pcCards.cards[0].image} outcome={gameOutcome} />


            </div>

            {gameOutcome !== null ? <Outcome value={msg().message} className={msg().className} /> : <div className="end-game"></div>}
        </div >
    )
}

export default BoardPc
