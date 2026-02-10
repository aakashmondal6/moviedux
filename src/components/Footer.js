import React from 'react'
import '../styles.css'

export default function Footer(){
    const date= new Date().getFullYear;
    return(
        <footer className='footer'>
            <p className='footer-text'> 
            © {date} MovieDux, All rights received.
            </p>
        </footer>
    )

}