import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <>
            <Link to="/landing">Inicio</Link>
            <Link to="/">Home</Link>
            <Link to="/dogs/add">Agregar nueva raza</Link>

        </>
    )
}