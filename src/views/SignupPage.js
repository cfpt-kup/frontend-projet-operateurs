// src/views/SignupPage.js
import React, { useState } from 'react';
import axios from 'axios';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (formData) => {
        setIsLoading(true);
        setError('');

        try {
            // Make sure the URL matches your API endpoint for the signup route
            const response = await axios.post('http://localhost:5001/api/users/signup', formData);

            console.log('Signup Success:', response.data);
            setIsLoading(false);
            // Optionally, redirect the user to another page or show a success message
            // For example, using React Router to redirect to the login page:
            // history.push('/login');
        } catch (err) {
            console.error('Signup Error:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.error : 'Error during signup');
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <SignupForm onSignup={handleSignup} isLoading={isLoading} error={error} />
        </div>
    );
};

export default SignupPage;
