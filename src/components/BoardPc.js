import React, { useContext } from 'react'
import './Board.css'
import './Card.css'
import './Outcome.css'
import Score from './Score';
import Card from './Card'
import AppContext from '../Context/AppContext'
import Outcome from './Outcome'

const BoardPc = props => {
    const { pcCards, pc_score_value, handleDrawCard, handleResult, setPc_Score_Value } = useContext(AppContext)

    return (
        <div className='board'>
            {
                <Score value={pcCards.cards != null ? pc_score_value : 0} />
            }

            <div className="cards">
                {(pcCards.cards != null) && pcCards.cards.slice(1).map(a => <Card value={a.image} key={a.code} />)}
                <Card value='./assets/purple_back.png' />
            </div>
            <div className='end-game'>
                <Outcome></Outcome>
            </div>
            {/* <Button onClick={() => { handleDrawCard(ACTIONS.SET_PC_CARDS, pcCards) }}>Hit</Button> */}

        </div >
    )
}

export default BoardPc
