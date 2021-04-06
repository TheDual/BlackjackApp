import React from 'react'

export const Score = props => {

    return (
        <div className='score'>
            <label>Score: {props.value}</label>
        </div>
    )
}

export default Score