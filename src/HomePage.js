import React from 'react';
import {
  Calendar,
  DollarSign,
  Building2,
  Clock,
  User,
  Briefcase,
  ArrowRight,
  Shield,
  Star,
  Users,
  Scissors,
  Coffee,
  Dumbbell
} from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <div className="text-center">
              <h1 className="hero-title">
                Welcome to BookingHub
              </h1>
              
              {/* Path Selection */}
              <div className="path-grid">
                {/* Customer Path */}
                <div className="path-card path-card-customer">
                  <User className="path-icon path-icon-customer" />
                  <h2 className="path-title">Looking for Services?</h2>
                  <p className="path-description">
                    Find and book appointments with local businesses. 
                    Instant confirmation and secure payments.
                  </p>
                  <div className="feature-list">
                    <div className="feature-item">
                      <Calendar className="feature-icon feature-icon-customer" />
                      <span>Easy appointment booking</span>
                    </div>
                    <div className="feature-item">
                      <Clock className="feature-icon feature-icon-customer" />
                      <span>Real-time availability</span>
                    </div>
                    <div className="feature-item">
                      <DollarSign className="feature-icon feature-icon-customer" />
                      <span>Secure payments</span>
                    </div>
                  </div>
                  <button className="btn btn-primary">
                    Find Services
                    <ArrowRight className="btn-icon" />
                  </button>
                </div>

                {/* Business Path */}
                <div className="path-card path-card-business">
                  <Briefcase className="path-icon path-icon-business" />
                  <h2 className="path-title">Business Owner?</h2>
                  <p className="path-description">
                    Streamline your booking process and grow your business 
                    with our comprehensive management tools.
                  </p>
                  <div className="feature-list">
                    <div className="feature-item">
                      <Building2 className="feature-icon feature-icon-business" />
                      <span>Complete business dashboard</span>
                    </div>
                    <div className="feature-item">
                      <Calendar className="feature-icon feature-icon-business" />
                      <span>Appointment management</span>
                    </div>
                    <div className="feature-item">
                      <DollarSign className="feature-icon feature-icon-business" />
                      <span>Payment processing</span>
                    </div>
                  </div>
                  <a href="/BusinessSignup">
                  <button className="btn btn-secondary">
                    Register Business
                    <ArrowRight className="btn-icon" />
                  </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About, Reviews, and Why Choose Us Sections */}
      <div className="container">
        <div className="content-grid">
          {/* About Us */}
          <div className="content-card about-us">
            <h2 className="content-title">About BookingHub</h2>
            <p className="content-text">
              BookingHub is revolutionizing the way people connect with local services. Founded in 2024, 
              we've made it our mission to simplify the booking process for both customers and businesses. 
              Our platform brings together the best local service providers with customers looking for 
              quality and convenience.
            </p>
            <p className="content-text mt-4">
              With thousands of satisfied users and growing, we're committed to delivering a seamless 
              booking experience that saves time and reduces hassle for everyone involved.
            </p>
          </div>

          {/* Customer Reviews */}
          <div className="review-card review-1">
            <h2 className="content-title">What Our Customers Say</h2>
            <div className="benefit-list">
              <div className="review-header">
                <div className="review-avatar">
                  <User size={24} className="text-purple-400" />
                </div>
                <div className="review-info">
                  <div className="review-name">Sarah Johnson</div>
                  <div className="review-role">Fitness Enthusiast</div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-content">
                "BookingHub has transformed how I schedule my fitness classes. 
                The real-time availability feature is a game-changer!"
              </p>

              <div className="review-header">
                <div className="review-avatar">
                  <Coffee size={24} className="text-purple-400" />
                </div>
                <div className="review-info">
                  <div className="review-name">David Martinez</div>
                  <div className="review-role">Coffee Shop Regular</div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-content">
                "I love being able to book my barber appointments instantly. 
                The reminder system ensures I never miss a session."
              </p>

              <div className="review-header">
                <div className="review-avatar">
                  <Scissors size={24} className="text-purple-400" />
                </div>
                <div className="review-info">
                  <div className="review-name">Emma Wilson</div>
                  <div className="review-role">Beauty Enthusiast</div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-content">
                "Finding and booking salon appointments has never been easier. 
                The platform is intuitive and saves me so much time!"
              </p>
            </div>
          </div>

          {/* Business Reviews */}
          <div className="review-card review-2">
            <h2 className="content-title">Business Success Stories</h2>
            <div className="benefit-list">
              <div className="review-header">
                <div className="review-avatar">
                  <Dumbbell size={24} className="text-purple-400" />
                </div>
                <div className="review-info">
                  <div className="review-name">Michael Chen</div>
                  <div className="review-role">Fitness Studio Owner</div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-content">
                "Our booking efficiency increased by 60% since joining BookingHub. 
                The automated system has revolutionized our scheduling."
              </p>

              <div className="review-header">
                <div className="review-avatar">
                  <Scissors size={24} className="text-purple-400" />
                </div>
                <div className="review-info">
                  <div className="review-name">Isabella Rodriguez</div>
                  <div className="review-role">Salon Owner</div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-content">
                "We've seen a 40% reduction in no-shows thanks to the automated 
                reminder system. Our clients love the easy booking process."
              </p>

              <div className="review-header">
                <div className="review-avatar">
                  <Coffee size={24} className="text-purple-400" />
                </div>
                <div className="review-info">
                  <div className="review-name">James Wilson</div>
                  <div className="review-role">Café Owner</div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-content">
                "The analytics tools have helped us optimize our scheduling and 
                staffing. We've increased our monthly revenue by 35%!"
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="content-card why-choose-us">
            <h2 className="content-title">Why Choose Us</h2>
            <div className="benefit-list">
              <div className="benefit-item">
                <Shield className="benefit-icon" />
                <div className="benefit-content">
                  <h3>Secure & Reliable</h3>
                  <p>State-of-the-art security for your bookings and payments</p>
                </div>
              </div>
              <div className="benefit-item">
                <Star className="benefit-icon" />
                <div className="benefit-content">
                  <h3>Quality Service</h3>
                  <p>Verified businesses and real customer reviews</p>
                </div>
              </div>
              <div className="benefit-item">
                <Users className="benefit-icon" />
                <div className="benefit-content">
                  <h3>Community Focused</h3>
                  <p>Supporting local businesses and building connections</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;