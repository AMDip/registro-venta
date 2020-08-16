import React from "react";
import './App.css';
import {Link} from 'react-router-dom';
import {Navbar,NavItem, NavLink} from 'react-bootstrap'

export default class Nav extends React.Component {
    render(){
        return(
            <nav>
                <h2 style={{textAlign: "center"}} >Registro ventas</h2>
                <ul className='nav-links'>
                    <Link to="/clientes">
                        <li>Clientes</li>
                    </Link>
                    <Link to="/empleados">
                        <li>Empleados</li>
                    </Link>
                    <Link to="/productos">
                        <li>Productos</li>
                    </Link>
                    <Link to="/ventas">
                        <li>Ventas</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}