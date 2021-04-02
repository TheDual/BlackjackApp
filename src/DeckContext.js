import React, { useState, createContext, useEffect } from 'react';
import Axios from 'axios';

export const DeckContext = createContext();
export const CardContext = createContext();


export const DeckProvider = props => {
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    useEffect(async () => {
        if (!isLoading) {
            await Axios.get(`https://deckofcardsapi.com/api/deck/new/`)
                .then(res => (res && res.data) || {})
                .then(data => {
                    setDeck({ data });
                    setisLoading(false);
                })
                .catch(err => console.log(err));

            console.log(deck.data.deck_id);
        }
    }, []);

    useEffect(async () => {
        if (!isLoading) {
            await Axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=2`)
                .then(res => (res && res.data) || {})
                .then(data => {
                    setCards(data);
                })
                .catch(err => console.log(err));
            console.log(cards);
        }

    }, [isLoading]);


    return (
        <DeckContext.Provider value={[deck, setDeck]}>
            <CardContext.Provider value={[cards, isLoading]}>
                {props.children}
            </CardContext.Provider>
        </DeckContext.Provider>
    )
}