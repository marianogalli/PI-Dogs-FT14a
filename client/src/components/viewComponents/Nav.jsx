import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <>
            <header class="header">
                <nav class="nav">
                    <Link className="nav-link logo" to="#">Logo</Link>
                    <ul class="nav-menu">
                        <li className="nav-menu-item"><Link className="nav-link" to="/landing">Inicio</Link></li>
                        <li className="nav-menu-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-menu-item"><Link className="nav-link" to="/dogs/add">Agregar nueva raza</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}