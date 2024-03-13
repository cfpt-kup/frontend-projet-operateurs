// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout'; // Adjust the import path if necessary
import SignupPage from './views/SignupPage'; // Import the SignupPage component
import HomePage from './views/HomePage'; // Import the HomePage component
import './App.css'; // Ensure you have some basic styles, especially for the form

function App() {
  return (
    <Router>
      <AppLayout> {/* Make sure AppLayout wraps the Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Add more routes for other pages */}
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
