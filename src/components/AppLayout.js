// AppLayout.js
import React from 'react';
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

    return (
        <div style={layoutStyle}>
            <Header />
            <main style={mainStyle}>{children}</main>
            <Footer />
        </div>
    );
};

export default AppLayout;
