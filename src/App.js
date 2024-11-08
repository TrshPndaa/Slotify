import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import BusinessSignup from './BusinessSignup';
import BusinessLogin from './BusinessLogin';
import Dashboard from './Dashboard';
import BookingComponent from './BookingComponent';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/business/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/BusinessSignup" element={<BusinessSignup/>}/>
        <Route path="/business/login" element={<BusinessLogin />} />
        <Route path="/login" element={<BusinessLogin />} />
        
        {/* Protected routes */}
        <Route path="/Dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;