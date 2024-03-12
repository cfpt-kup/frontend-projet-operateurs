// src/views/SignupPage.js
import React, { useState } from 'react';
import axios from 'axios';
import SignupForm from '../components/SignupForm';
import Message from '../components/Message'; // Import the Message component

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ msg: '', type: '' }); // Unified message state

    const handleSignup = async (formData) => {
        setIsLoading(true);
        setMessage({ msg: '', type: '' }); // Reset message state

        try {
            await axios.post('http://localhost:5001/api/users/signup', formData);
            setMessage({ msg: 'Signup successful! Please check your email to confirm.', type: 'success' });
            setIsLoading(false);
            // Redirect or manage the state to show a logged-in view
        } catch (err) {
            setIsLoading(false);
            let errorMsg = 'Error during signup. Please try again later.';

            // Adjusting to match backend's response structure (using 'msg' instead of 'error')
            if (err.response && err.response.data && err.response.data.msg) {
                // More detailed console logging for debugging purposes; consider removing in production.
                console.log('Signup Error:', err.response.data.msg);

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

            setMessage({ msg: errorMsg, type: 'error' });
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {message.msg && <Message msg={message.msg} type={message.type} />} {/* Display the message */}
            <SignupForm onSignup={handleSignup} isLoading={isLoading} />
        </div>
    );
};

export default SignupPage;
