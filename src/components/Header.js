import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
import axios from 'axios';
import Swal from 'sweetalert2';
import './Header.css';

const Header = () => {
    let navigate = useNavigate();
    const { isAuthenticated, onAuthChange } = useAuth();

    const handleLogout = async () => {
        // SweetAlert confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You are about to log out.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!'
        });

        // Proceed with logout if confirmed
        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                await axios.post('http://localhost:5001/api/users/logout', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                localStorage.removeItem('token');
                onAuthChange(false); // Directly use onAuthChange from useAuth context

                // SweetAlert notification for successful logout
                await Swal.fire({
                    icon: 'success',
                    title: 'Logged Out',
                    text: 'You have successfully logged out.',
                });

                navigate('/'); // Redirect to the homepage after closing the SweetAlert
            } catch (error) {
                console.error('Logout failed:', error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Logout Failed',
                    text: 'An error occurred while trying to log out. Please try again.',
                });
            }
        }
    };

    return (
        <header className="header">
            <nav className="navbar">
                <div className="container">
                    <Link to="/" className="navbar-brand">Projet Support Opérateurs</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
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
                                    <Link to="/profile" className="nav-link">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={handleLogout} className="nav-link btn-link" style={{ border: 'none', background: 'none' }}>Logout</Link>
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
