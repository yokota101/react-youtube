import React from 'react'
import Header from '../Header/Header'
import Style from './Layout.module.scss'
import Footer from '../Footer/Footer'

const Layout = ({children}) => {
    return (
        <div className={Style.wrapper}>
            <Header />
            <div className={Style.main}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout  
             