import React from 'react'

const Outcome = props => {
    return (
        <label className='outcome'>
            You <b>{props.value}</b>
        </label>
    )
}

export default Outcome
