import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppContext from './Context/AppContext'

ReactDOM.render(
    <AppContext.Provider>
        <App />
    </AppContext.Provider>,
    document.getElementById('root')
);
