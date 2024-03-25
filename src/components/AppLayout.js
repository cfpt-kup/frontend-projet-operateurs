// AppLayout.js
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Ensure this path matches your project structure
import Header from './Header'; // Import your Header component
import Footer from './Footer'; // Import your Footer component

const AppLayout = ({ children }) => {
    // Styles for the outer container
    const layoutStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Use viewport height to ensure footer can stick to the bottom
    };

    // Styles for the main content area to make it flexible
    const mainStyle = {
        flex: 1,
    };

    // Use useAuth hook to get the authentication status and handler
    const { isAuthenticated, onAuthChange } = useAuth();

    return (
        <div style={layoutStyle}>
            {/* Pass isAuthenticated and onAuthChange from context to Header */}
            <Header isAuthenticated={isAuthenticated} onAuthChange={onAuthChange} />
            <main style={mainStyle}>{children}</main>
            <Footer />
        </div>
    );
};

export default AppLayout;
