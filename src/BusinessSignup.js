import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, User, Lock, Briefcase } from 'lucide-react';
import './BusinessSignup.css';

const BusinessSignup = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    phone: '',
    address: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/business/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setFormData({
          businessName: '',
          ownerName: '',
          email: '',
          password: '',
          confirmPassword: '',
          businessType: '',
          phone: '',
          address: ''
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="business-signup-container">
      <div className="signup-form-container">
        <div className="signup-card">
          <h1 className="signup-title">Register Your Business</h1>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Building2 className="form-icon" />
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Business Name"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <User className="form-icon" />
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Owner Name"
                required
                className="form-input"
              />
            </div>

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

            <div className="form-group">
              <Lock className="form-icon" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <Briefcase className="form-icon" />
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select Business Type</option>
                <option value="salon">Salon</option>
                <option value="fitness">Fitness Studio</option>
                <option value="cafe">Café</option>
                <option value="spa">Spa</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <Phone className="form-icon" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <MapPin className="form-icon" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Business Address"
                required
                className="form-input form-textarea"
                rows="3"
              />
            </div>
            <a href="/Dashboard">
            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading && (
                <span className="loading-spinner">↻</span>
              )}
              Register Business
            </button>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignup;