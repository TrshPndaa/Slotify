import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import './BusinessSignup.css';

const BusinessLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting to login with:', formData); // Debug log

      const response = await fetch('http://localhost:5000/api/business/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',  // Add this line
        body: JSON.stringify(formData)
      });

      console.log('Response received:', response); // Debug log

      const data = await response.json();
      console.log('Data received:', data); // Debug log

      if (response.ok) {
        // Store business info
        localStorage.setItem('businessId', data.business_id);
        localStorage.setItem('businessName', data.business_name);
        navigate('/Dashboard');
      } else {
        setError(data.message || 'Failed to login');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to server. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="business-signup-container">
      <div className="signup-form-container">
        <div className="signup-card">
          <h1 className="signup-title">Business Login</h1>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Mail className="form-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <Lock className="form-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? (
                <span className="loading-spinner">⟳</span>
              ) : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessLogin;