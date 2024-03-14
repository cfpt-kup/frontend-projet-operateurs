import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = ({ isAuthenticated, onAuthChange }) => {
    let navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/users/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');
            onAuthChange(false); // Update parent component's authentication state
            navigate('/'); // Redirect to the homepage
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="header">
            <nav className="navbar">
                <div className="container">
                    <Link to="/" className="navbar-brand">Projet Support Opérateurs</Link>
                    <ul className="navbar-nav">
                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Log In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link">Sign Up</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    {/* Change this to a button to properly handle the logout functionality */}
                                    <Link onClick={handleLogout} className="nav-link btn-link">Logout</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">Profile</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
