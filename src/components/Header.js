import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Make sure SweetAlert2 is imported
import './Header.css';

const Header = ({ isAuthenticated, onAuthChange }) => {
    let navigate = useNavigate();

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
                onAuthChange(false); // Update parent component's authentication state

                // SweetAlert notification for successful logout
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out',
                    text: 'You have successfully logged out.',
                }).then(() => {
                    navigate('/'); // Redirect to the homepage after closing the SweetAlert
                });
            } catch (error) {
                console.error('Logout failed:', error);

                // Optionally, you can also display an error message using SweetAlert if the logout fails
                Swal.fire({
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
                        {/* Homepage link */}
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
                                    {/* Use a button for logout to properly handle the logout functionality */}
                                    <Link onClick={handleLogout} className="nav-link btn-link">Logout</Link>
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
