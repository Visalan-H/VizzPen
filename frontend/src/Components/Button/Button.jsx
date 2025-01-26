import React from 'react'
import './Button.css'

export const Button = ({ title, icon, onClick = () => { } }) => {

    return (
        <button className='main_button' title={title} onClick={onClick}>
            <i className={`fa fa-${icon}`}></i>
        </button>
    )
}