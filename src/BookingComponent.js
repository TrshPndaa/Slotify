import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, ArrowRight, ArrowLeft, Building2 } from 'lucide-react';
import './BookingComponent.css';

const BookingComponent = ({ businessId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchBusinessInfo();
    fetchAvailableSlots();
  }, [selectedDate, businessId]);

  const fetchBusinessInfo = async () => {
    try {
      const response = await fetch(`/api/business/${businessId}`);
      if (!response.ok) throw new Error('Failed to fetch business info');
      const data = await response.json();
      setBusinessInfo(data);
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to load business information' });
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const date = selectedDate.toISOString().split('T')[0];
      const response = await fetch(`/api/slots/${businessId}?date=${date}`);
      if (!response.ok) throw new Error('Failed to fetch slots');
      const data = await response.json();
      setAvailableSlots(data);
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to load available slots' });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setBookingStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slotId: selectedSlot.id,
          ...formData
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus({ type: 'success', message: 'Booking confirmed!' });
        setBookingStep(3);
      } else {
        throw new Error(data.message || 'Failed to create booking');
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  const goBack = () => {
    setBookingStep(prev => prev - 1);
    setStatus({ type: '', message: '' });
  };

  const renderBookingContent = () => {
    switch (bookingStep) {
      case 1:
        return (
          <div className="time-selection">
            <div className="date-selector">
              <div className="date-input-container">
                <Calendar className="text-purple-300" size={20} />
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => handleDateChange(new Date(e.target.value))}
                  className="date-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="slots-grid">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotSelect(slot)}
                      className={`time-slot ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                    >
                      <Clock size={20} />
                      <span>{slot.startTime} - {slot.endTime}</span>
                    </button>
                  ))
                ) : (
                  <div className="no-slots">
                    <p>No available slots for this date</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <form onSubmit={handleBooking} className="booking-form">
            <div className="form-container">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <div className="input-container">
                  <User size={20} />
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Enter your full name"
                    required
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-container">
                  <Mail size={20} />
                  <input
                    type="email"
                    name="customerEmail"
                    placeholder="your@email.com"
                    required
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="input-container">
                  <Phone size={20} />
                  <input
                    type="tel"
                    name="customerPhone"
                    placeholder="Your phone number"
                    required
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Confirm Booking
              <ArrowRight size={20} />
            </button>
          </form>
        );

      case 3:
        return (
          <div className="confirmation-container">
            <div className="confirmation-icon">
              <Calendar size={32} />
            </div>
            <h2 className="confirmation-title">Booking Confirmed!</h2>
            <p className="confirmation-details">
              We've sent the booking details to your email.
            </p>
            <div className="details-box">
              <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selectedSlot?.startTime} - {selectedSlot?.endTime}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-wrapper">
        {/* Progress Steps */}
        <div className="progress-container">
          <div className="progress-steps">
            {['Select Time', 'Your Details', 'Confirmation'].map((step, index) => (
              <div 
                key={step}
                className={`progress-step ${index + 1 === bookingStep ? 'active' : 'inactive'}`}
              >
                <div className={`step-circle ${index + 1 === bookingStep ? 'active' : 'inactive'}`}>
                  {index + 1}
                </div>
                <span className="step-label">{step}</span>
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill"
              style={{ width: `${((bookingStep - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* Business Info */}
        {businessInfo && (
          <div className="info-card">
            <div className="info-content">
              <div className="info-icon-container">
                <Building2 size={24} />
              </div>
              <div className="info-text">
                <h2>{businessInfo.name}</h2>
                <p>{businessInfo.type} · {businessInfo.address}</p>
              </div>
            </div>
          </div>
        )}

        {/* Status Alert */}
        {status.message && (
          <div className={`alert ${status.type === 'error' ? 'alert-error' : 'alert-success'}`}>
            <p>{status.message}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="card main-card">
          <div className="card-header">
            <h2 className="card-title">
              {bookingStep === 1 && "Select Your Preferred Time"}
              {bookingStep === 2 && "Complete Your Booking"}
              {bookingStep === 3 && "Booking Confirmed!"}
            </h2>
            {bookingStep > 1 && bookingStep < 3 && (
              <button onClick={goBack} className="back-button">
                <ArrowLeft size={20} />
                Back
              </button>
            )}
          </div>
          <div className="card-content">
            {renderBookingContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingComponent;