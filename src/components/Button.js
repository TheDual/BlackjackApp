import React from 'react'
import './Button.css'

export const Button = ({ children, onClick }) => {

    return (
        <button onClick={onClick} className='btn'> {children} </button>
    )
};

export default Button;

