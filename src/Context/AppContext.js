import React, { createContext, useReducer, useEffect, useState } from "react"
import Axios from 'axios'


const Context = createContext()

export const ACTIONS = {
    SET_DECK: "SET_DECK",
    SET_MY_CARDS: "SET_MY_CARDS",
    SET_PC_CARDS: "SET_PC_CARDS",
    SET_OUTCOME: "SET_OUTCOME",
}

export const getCardValue = (card) => {
    let val = parseInt(card.value)
    if (!isNaN(val))
        return val
    if (card.value === 'ACE')
        return 11
    return 10
}

const updateCards = (mycards, card) => {
    mycards.cards.push(card.cards[0])
    mycards.remaining = card.remaining
    return mycards
}


export const handleScore = (deck) => {
    if (deck.cards != null) {
        let scr = 0
        let aces_count = 0
        let result = 0

        for (let i = 0; i < deck.cards.length; i++) {
            result = getCardValue(deck.cards[i])
            if (result === 11)
                aces_count++
            scr += result
        }

        if (scr > 21 && aces_count)
            while (aces_count) {
                scr -= 10
                aces_count--
            }

        return scr
    }
    return 0
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
                        return { ...state, myCards: action.value }
                    }
                case ACTIONS.SET_PC_CARDS:
                    return { ...state, pcCards: action.value }

                case ACTIONS.SET_OUTCOME:
                    return { ...state, gameOutcome: action.value }

                default:
                    return state
            }
        },
        {
            myDeck: [],
            myCards: [],
            pcCards: [],
            gameOutcome: null,
            ...value
        }
    )
    const [score_value, setScore_value] = useState(0)
    const [pc_score_value, setPc_score_value] = useState(0)
    const [isPaused, setPaused] = useState(true)
    const [playerFinished, setPlayerFinished] = useState(false)
    const [gameOver, setGameOver] = useState(false)



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

    useEffect(() => {
        let deck = { ...state.myCards }
        setScore_value(handleScore(deck))

        if ((score_value === 21) && (state.myCards.cards.length === 2)) {
            setPlayerFinished(true)
            setGameOver(true)
        }
        if (score_value > 21)
            setGameOver(true)

    }, [{ ...state.myCards }])

    useEffect(() => {
        let deck = { ...state.pcCards }
        setPc_score_value(handleScore(deck))
        if (pc_score_value > 21) {
            setGameOver(true)
        }
    }, [{ ...state.pcCards }])

    useEffect(() => {
        //BUSTED
        if (score_value > 21) {
            dispatch({
                type: ACTIONS.SET_OUTCOME,
                value: 0
            })
            setPlayerFinished(true)
        }

        //PC BUSTED
        if (pc_score_value > 21)
            dispatch({
                type: ACTIONS.SET_OUTCOME,
                value: 1
            })
        //CALCULATE RESULT
        if ((isPaused && playerFinished) && state.gameOutcome === null) {
            dispatch({
                type: ACTIONS.SET_OUTCOME,
                value: getOutcome()
            })
        }
    }, [gameOver, state.gameOutcome])


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

    const getOutcome = () => {
        if (score_value != pc_score_value) {
            if ((state.myCards.cards.length == 2) && (score_value == 21))
                return 5 //BlACKJACK
            if (score_value > pc_score_value)
                return 2 // WIN
            return 3 // LOSE
        }
        return 4 // DRAW
    }


    return <Provider value={{
        ...state,
        dispatch,
        score_value,
        pc_score_value,
        isPaused,
        setPaused,
        setPlayerFinished,
        playerFinished,
        gameOver,
        setGameOver,
        handleDrawCard

    }}>
        {children}
    </Provider>
})(Context.Provider)

export default Context