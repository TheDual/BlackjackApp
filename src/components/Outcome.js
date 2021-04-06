import React from 'react'

const Outcome = props => {
    return (
        <div className='end-game'>
            <label className={`outcome ${props.className}`} >
                {props.value[0]} <b>{props.value[1]}</b>
            </label>
        </div>
    )
}

export default Outcome
