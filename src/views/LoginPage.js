// src/views/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const LoginPage = ({ onAuthChange }) => {
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate(); // For redirecting after login

    const handleLogin = async (formData) => {
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/api/users/login', formData);
            setIsLoading(false);
            const { token } = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            Swal.fire({
                icon: 'success',
                title: 'Logged In',
                text: 'You have successfully logged in.',
            });

            // Signal the App component that the user has successfully logged in
            if (onAuthChange) {
                onAuthChange(true);
            }

            // Optionally, redirect the user to a different page
            navigate('/'); // Redirects to the homepage, adjust as necessary
        } catch (err) {
            setIsLoading(false);
            let errorMsg = 'Invalid email or password.';
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: errorMsg,
            });
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <LoginForm onLogin={handleLogin} isLoading={isLoading} />
        </div>
    );
};

export default LoginPage;
