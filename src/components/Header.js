// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import HomePage styling

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="container">
                    <Link to="/" className="navbar-brand">Projet Support Opérateurs</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Log In</Link>
                        </li>
                        {/* Add more navigation links as needed */}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
