import React from 'react'
import Style from './Footer.module.scss'

const Footer = () => {
    return (
        <div className={Style.wrapper}>
            <h2>Worldtube</h2>
            <a href="https://www.youtube.com/t/terms" rel="noopener noreferrer" target="_blank">YouTube Terms Of Services</a>
            <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Google Privacy policy</a>
        </div>
    )
}

export default Footer  
             