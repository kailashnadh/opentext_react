import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class HeaderComponent extends Component {
    render() {

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://www.carbonite.com/" className="navbar-brand">Carbonite</a></div>
                    <ul className="navbar-nav">
                        <Link className="nav-link" to="/users">User Product Details</Link>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent