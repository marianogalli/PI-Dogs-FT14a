import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <>
            <header className="header">
                <nav className="nav">
                    <Link className="nav-link logo" to="#"></Link>
                    <ul class="nav-menu">
                        <li className="nav-menu-item"><Link className="nav-menu-link" to="/">Inicio</Link></li>
                        <li className="nav-menu-item"><Link className="nav-menu-link" to="/dogs">Home</Link></li>
                        <li className="nav-menu-item"><Link className="nav-menu-link" to="/dogs/add">Agregar nueva raza</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}