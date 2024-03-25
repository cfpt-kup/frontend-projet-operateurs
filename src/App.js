import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/AppLayout';
import SignupPage from './views/SignupPage';
import LoginPage from './views/LoginPage'; // Import the LoginPage component
import HomePage from './views/HomePage';
import ProfilePage from './views/ProfilePage'; // Import the ProfilePage component
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('token') !== null);
    };

    // Listen for local storage changes to update auth state
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to be called by LoginPage on successful login
  const handleAuthChange = (authStatus) => {
    setIsAuthenticated(authStatus);
  };

  return (
    <Router>
      <AuthProvider>
        <AppLayout isAuthenticated={isAuthenticated} onAuthChange={handleAuthChange}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage onAuthChange={handleAuthChange} />} />
            {/* Pass the handleAuthChange function as a prop to LoginPage */}
            <Route path="/login" element={<LoginPage onAuthChange={handleAuthChange} />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AppLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
