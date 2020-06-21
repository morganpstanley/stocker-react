import React from "react"
import './Header.css'
import {Link} from "react-router-dom";

const Header = ({link, title}) => {
    return (
        <h1 id="header">
            <span id='logo'>
                <span id="logo-stock">STOCK</span><span id="logo-er">ER</span>
            </span>
            <span id="nav">
                    <nav>
                        <Link to={link} id="log-in-link">{title}</Link>
                    </nav>
            </span>
        </h1>
    )
}

export default Header