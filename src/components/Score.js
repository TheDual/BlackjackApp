import React from 'react'
import AppContext from '../Context/AppContext'


export const Score = props => {

    return (
        <div className='score'>
            <label>Score: {props.value}</label>
        </div>
    )
}

export default Score