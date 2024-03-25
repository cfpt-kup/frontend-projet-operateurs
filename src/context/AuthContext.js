// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onAuthChange = (status) => {
        setIsAuthenticated(status);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, onAuthChange }}>
            {children}
        </AuthContext.Provider>
    );
};