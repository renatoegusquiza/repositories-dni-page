import React from 'react'

//Importacion del componente boton de usuario
import UserButton from './UserButton'

//Importacion del componente de estilos css
import './Navbar.css'

//Importacion de la(s) imagen(es) para el navbar
import LogoRimac from '../assets/images/rimac-logo.png'

export default function Navbar() {
    return (
        <>
            <header>
                <nav className="container-navbar">
                    <img src={LogoRimac} alt='logo-navbar' className='logo-navbar'/>
                    <ul className="navbar-links">
                        <li className='navbar-link'>
                            <a href='/'>reporteDiario</a>
                        </li>
                        <li className='navbar-link'>
                            <a href='/'>Consulta de afiliación y pago</a>
                        </li>
                        <UserButton text="Aguilar"/>
                    </ul>
                </nav>
            </header>
        </>
    )
}
