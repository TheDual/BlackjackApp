import React, { createContext, useReducer, useEffect } from "react"
import Axios from 'axios'


const Context = createContext()

export const ACTIONS = {
    SET_DECK: "SET_DECK",
    SET_MY_CARDS: "SET_MY_CARDS",
    SET_PC_CARDS: "SET_PC_CARDS",
}

export const updateCards = (mycards, card) => {
    console.log(2)
    mycards.cards.push(card.cards[0])
    mycards.remaining = card.remaining
    return mycards
}

Context.displayName = "AppContext"
Context.Provider = (Provider => props => {
    const { children, value } = props || {}
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case ACTIONS.SET_DECK:
                    return { ...state, myDeck: action.value }
                case ACTIONS.SET_MY_CARDS:
                    {
                        console.log("T")
                        return { ...state, myCards: action.value }
                    }
                case ACTIONS.SET_PC_CARDS:
                    return { ...state, pcCards: action.value }
                default:
                    return state
            }
        },
        {
            myDeck: [],
            myCards: [],
            pcCards: [],
            ...value
        }
    )

    useEffect(() => {
        Axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            .then(res => (res && res.data) || {})
            .then(data => {
                dispatch({
                    type: ACTIONS.SET_DECK,
                    value: data
                })

                Axios.get(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`)
                    .then(res => (res && res.data) || {})
                    .then(myCards => {
                        dispatch({
                            type: ACTIONS.SET_MY_CARDS,
                            value: myCards
                        })
                    })
                    .catch(err => console.log(err))

                Axios.get(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`)
                    .then(res => (res && res.data) || {})
                    .then(pcCards => {
                        dispatch({
                            type: ACTIONS.SET_PC_CARDS,
                            value: pcCards
                        })
                    })
                    .catch(err => console.log(err))
            })

            .catch(err => console.log(err));
    }, [])


    const handleDrawCard = (action, cards) => {
        Axios.get(`https://deckofcardsapi.com/api/deck/${cards.deck_id}/draw/?count=1`)
            .then(res => (res && res.data) || {})
            .then(card => {
                dispatch({
                    type: action,
                    value: updateCards(cards, card)
                })
            })
            .catch(err => console.log(err))
    }


    return <Provider value={{
        ...state,
        dispatch,
        handleDrawCard
    }}>
        {children}
    </Provider>
})(Context.Provider)

export default Context