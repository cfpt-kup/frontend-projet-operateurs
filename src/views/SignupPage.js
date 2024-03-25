import React, { useState } from 'react';
import axios from 'axios';
import SignupForm from '../components/SignupForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    const { onAuthChange } = useAuth(); // Use the context to get the function to update auth state

    const handleSignup = async (formData) => {
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/api/users/signup', formData);
            setIsLoading(false);
            const { token } = response.data;
            // Save the JWT token for future requests
            localStorage.setItem('token', token);

            // Set the token for all future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Signup successful! You are now logged in.',
            });

            // Update authentication state via context
            onAuthChange(true);

            // Redirect to the homepage
            navigate('/');
        } catch (err) {
            setIsLoading(false);
            let errorMsg = 'Error during signup. Please try again later.';

            if (err.response && err.response.data && err.response.data.msg) {
                errorMsg = err.response.data.msg;
            } else if (err.message) {
                errorMsg = err.message;
            }

            // Show error message
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: errorMsg,
            });
        }
    };

    return (
        <div className="form-container">
            <h2>Sign up</h2>
            <SignupForm onSignup={handleSignup} isLoading={isLoading} />
        </div>
    );
};

export default SignupPage;
