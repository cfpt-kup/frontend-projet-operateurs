// src/views/ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ProfilePage.css'; // Ensure the path is correct based on your project structure

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate for redirection

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/'); // Redirect to login page if no token is found
                return; // Early return to prevent further execution
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get('http://localhost:5001/api/users/profile', config);
                setUser(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.error : err.message);
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]); // Add navigate to the dependency array

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="profile-page">
            <h2>Profile</h2>
            <p><strong>First Name:</strong> {user.firstname}</p>
            <p><strong>Last Name:</strong> {user.lastname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Class:</strong> {user.school_class}</p>
            {/* Display more user information as needed */}
        </div>
    );
};

export default ProfilePage;
