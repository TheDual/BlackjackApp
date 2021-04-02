import React from 'react'
import './App.css';
import Board from './components/Board';
import BoardPc from './components/BoardPc';
import Axios from 'axios'
import { DeckProvider } from './DeckContext';
import AppContext from './Context/AppContext';


function App() {



  // useEffect(async () => {
  //   await Axios.get(`https://deckofcardsapi.com/api/deck/new/`)
  //     .then(res => (res && res.data) || {})
  //     .then(data => {
  //       console.log(data);
  //       setDeck(setDeck);
  //     })
  //     .catch(err => console.log(err))
  // }, []);


  return (
    <>

      <BoardPc />
      <Board />

    </>
  );
}

export default App;
