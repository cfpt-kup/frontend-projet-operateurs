import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    const { onAuthChange } = useAuth(); // Use the context to get the function to update auth state

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

            // Update the global auth state to reflect that the user is now logged in
            onAuthChange(true);

            navigate('/'); // Redirect to homepage or desired route after login
        } catch (err) {
            setIsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password.',
            });
        }
    };

    return (
        <div className="form-container">
            <h2>Log in</h2>
            <LoginForm onLogin={handleLogin} isLoading={isLoading} />
        </div>
    );
};

export default LoginPage;
