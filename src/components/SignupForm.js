// src/components/SignupForm.js
import React, { useState } from 'react';

const SignupForm = ({ onSignup, isLoading, error }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        school_class: '',
        email: '',
        password: '',
        access_code: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                type="text"
                name="school_class"
                value={formData.school_class}
                onChange={handleChange}
                placeholder="School Class"
                required
            />
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
            <input
                type="text"
                name="access_code"
                value={formData.access_code}
                onChange={handleChange}
                placeholder="Access Code"
                required
            />
            <button type="submit" disabled={isLoading}>Sign Up</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default SignupForm;
