// src/views/SignupPage.js
import React, { useState } from 'react';
import axios from 'axios';
import SignupForm from '../components/SignupForm';
import Swal from 'sweetalert2'; // Import SweetAlert2

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (formData) => {
        setIsLoading(true);

        try {
            await axios.post('http://localhost:5001/api/users/signup', formData);
            setIsLoading(false);
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Signup successful! Please check your email to confirm.',
            });
            // Redirect or manage the state to show a logged-in view
        } catch (err) {
            setIsLoading(false);
            let errorMsg = 'Error during signup. Please try again later.';

            // Adjusting to match backend's response structure (using 'msg' instead of 'error')
            if (err.response && err.response.data && err.response.data.msg) {
                if (err.response.data.msg === 'Invalid or inactive access code.') {
                    errorMsg = 'The provided access code is invalid or has already been used.';
                } else if (err.response.data.msg === 'User already exists.') {
                    errorMsg = 'This email is already registered. Please log in or use a different email.';
                } else {
                    errorMsg = err.response.data.msg; // Directly use the backend message if it doesn't match known errors
                }
            } else if (err.message) {
                errorMsg = err.message; // Fallback to generic error message
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
        <div>
            <h2>Sign Up</h2>
            <SignupForm onSignup={handleSignup} isLoading={isLoading} />
        </div>
    );
};

export default SignupPage;
