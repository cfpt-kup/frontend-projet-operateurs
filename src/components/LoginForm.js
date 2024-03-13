// src/components/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css'; // Ensure you have the CSS for styling

const LoginForm = ({ onLogin, isLoading, error }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formData);
    };

    return (
        <form className="login-form-container" onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button className="btn-submit" type="submit" disabled={isLoading}>Login</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default LoginForm;
