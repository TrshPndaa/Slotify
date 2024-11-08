import React, { useState, useEffect } from 'react';
import {
  Calendar,
  DollarSign,
  User,
  Clock,
  Settings,
  CreditCard,
  BookOpen,
  ChevronDown,
  Edit2,
  Trash2,
  RefreshCcw,
  Plus,
  Check,
  X
} from 'lucide-react';
import "./BusinessDashboard.css"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [showEditForm, setShowEditForm] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    } else if (activeTab === 'business-info') {
      fetchBusinessInfo();
    }
  }, [activeTab]);

  const token = localStorage.getItem('token');
  const businessId = localStorage.getItem('businessId');
  
  const fetchBookings = async () => {
    try {
      const response = await fetch(`/api/business/bookings/${businessId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('businessId');
        localStorage.removeItem('businessName');
        window.location.href = '/business/login';
        return;
      }
      
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setError('Failed to load bookings');
    }
  };
  const fetchBusinessInfo = async () => {
    try {
      const response = await fetch(`/api/business/${businessId}`);
      if (!response.ok) throw new Error('Failed to fetch business info');
      const data = await response.json();
      setBusinessInfo(data);
      setFormData({
        businessName: data.name,
        ownerName: data.owner || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || ''
      });
    } catch (error) {
      setError('Failed to load business information');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const response = await fetch(`/api/business/bookings/${bookingId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to cancel booking');
      
      setSuccess('Booking cancelled successfully');
      fetchBookings(); // Refresh bookings list
    } catch (error) {
      setError('Failed to cancel booking');
    }
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/business/info/${businessId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update business info');

      setSuccess('Business information updated successfully');
      setShowEditForm(false);
      fetchBusinessInfo();
    } catch (error) {
      setError('Failed to update business information');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'bookings', label: 'Bookings', icon: BookOpen },
    { id: 'business-info', label: 'Business Info', icon: Settings },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'banking', label: 'Banking', icon: CreditCard }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-content">
          {/* Sidebar */}
          <aside className="dashboard-sidebar">
            <nav className="sidebar-nav">
              <ul>
                {tabs.map(tab => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                    >
                      <tab.icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="dashboard-main">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {activeTab === 'bookings' && (
              <section>
                <div className="section-header">
                  <h2>Upcoming Bookings</h2>
                  <button onClick={fetchBookings} className="refresh-button">
                    <RefreshCcw size={20} />
                    Refresh
                  </button>
                </div>
                
                <div className="bookings-grid">
                  {bookings.map(booking => (
                    <div key={booking.id} className="booking-card">
                      <div className="booking-info">
                        <h3>{booking.customerName}</h3>
                        <div className="booking-meta">
                          <Calendar size={16} />
                          <span>{formatDate(booking.date)} at {booking.startTime}</span>
                        </div>
                        <div className="booking-meta">
                          <User size={16} />
                          <span>{booking.customerEmail}</span>
                        </div>
                        <div className="booking-meta">
                          <Clock size={16} />
                          <span>{booking.customerPhone}</span>
                        </div>
                      </div>
                      <div className="booking-actions">
                        <button onClick={() => handleCancelBooking(booking.id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'business-info' && (
              <section>
                <div className="section-header">
                  <h2>Business Information</h2>
                  <button onClick={() => setShowEditForm(!showEditForm)}>
                    <Edit2 size={20} />
                    {showEditForm ? 'Cancel Edit' : 'Edit Info'}
                  </button>
                </div>
                
                {showEditForm ? (
                  <form onSubmit={handleInfoSubmit} className="info-form">
                    <div className="form-grid">
                      <div>
                        <label>Business Name</label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label>Owner Name</label>
                        <input
                          type="text"
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="full-width">
                        <label>Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button type="button" onClick={() => setShowEditForm(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  businessInfo && (
                    <div className="info-grid">
                      {Object.entries(businessInfo).map(([key, value]) => (
                        <div key={key} className="info-card">
                          <div className="info-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                          <div className="info-value">{value}</div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </section>
            )}

            {activeTab === 'availability' && (
              <section>
                <h2 className="form-title">Availability Settings</h2>
                <div className="availability-grid">
                  <div className="hours-card">
                    <h3>Business Hours</h3>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <div key={day} className="day-row">
                        <span>{day}</span>
                        <div className="time-select">
                          <select defaultValue="9:00">
                            <option>9:00 AM</option>
                            <option>10:00 AM</option>
                          </select>
                          <span>to</span>
                          <select defaultValue="17:00">
                            <option>5:00 PM</option>
                            <option>6:00 PM</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="break-card">
                      <h3>Break Times</h3>
                      <button>
                        <Plus size={20} />
                        Add Break Time
                      </button>
                    </div>
                    <div className="special-dates-card">
                      <h3>Special Dates</h3>
                      <button>
                        <Plus size={20} />
                        Add Special Date
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;