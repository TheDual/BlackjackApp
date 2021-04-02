import React, { useContext, useEffect } from 'react';
import './Board.css';
import './Button.css';
import Button from './Button';
import Card from './Card';
import './Card.css';
import AppContext, { ACTIONS } from '../Context/AppContext'


const Board = props => {
    const { myCards, dispatch, handleDrawCard } = useContext(AppContext)



    // const handleDrawCard = () => {
    //     Axios.get(`https://deckofcardsapi.com/api/deck/${myCards.deck_id}/draw/?count=1`)
    //         .then(res => (res && res.data) || {})
    //         .then(card => {
    //             dispatch({
    //                 type: ACTIONS.SET_MY_CARDS,
    //                 value: updateCards(myCards, card)
    //             })
    //         })
    //         .catch(err => console.log(err))
    // }
    useEffect(() => {
        console.log("My cards: ", myCards)
    }, [myCards])
    return (
        <div className='board'>
            <div className="cards">
                {
                    (myCards.cards != null) && myCards.cards.map(a => <Card value={a.image} key={a.code} />)
                }
            </div>
            <div className="buttons">
                <Button onClick={() => { handleDrawCard(ACTIONS.SET_MY_CARDS, myCards, dispatch) }}>Hit</Button>
                <Button>Stand</Button>
            </div>
        </div >
    )
}

export default Board
