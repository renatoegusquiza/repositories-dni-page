import React from 'react'

//Import de la hoja de estilos
import './Footer.css'

//Import de icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons'

//Import de imagen
import LogoBlanco from '../assets/images/logo-rimac-blanco.png'


export default function Footer() {
    return (
        <footer className='footer-container'>
            <div className="footer-content">
                <div className='logo-all-rights-reserved'>
                    <img src={LogoBlanco} alt='logo-rimac-blanco'
                        className='logo-rimac-blanco' />
                    <p>® 2019 Rimac Seguros y Reaseguros.</p>
                    <p> Todos los derechos reservados.</p>
                </div>
                <div className='footer-links'>
                    <div className='app-store-link'>
                        <FontAwesomeIcon icon={faApple} className='apple-icon' />
                        <p>App Store</p>
                    </div>
                    <div className='google-play-link'>
                        <FontAwesomeIcon icon={faGooglePlay} className='google-play-icon' />
                        <p>Google Play</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
