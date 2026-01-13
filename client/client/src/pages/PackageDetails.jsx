import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { packageAPI, feedbackAPI } from '../config/api';
import { useAuth } from '../context/AuthContext';
import { FaStar, FaClock, FaMapMarkerAlt, FaUsers, FaCheck, FaTimes, FaCalendar } from 'react-icons/fa';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [package_, setPackage] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchPackageDetails();
    fetchFeedbacks();
  }, [id]);

  const fetchPackageDetails = async () => {
    try {
      const response = await packageAPI.getById(id);
      if (response.data.success) {
        setPackage(response.data.package);
      }
    } catch (error) {
      console.error('Error fetching package:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await feedbackAPI.getPackageFeedbacks(id);
      if (response.data.success) {
        setFeedbacks(response.data.feedbacks);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate(`/book/${id}`);
    } else {
      navigate('/login');
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  if (!package_) {
    return <div className="container"><h2>Package not found</h2></div>;
  }

  return (
    <div className="package-details">
      {/* Image Gallery */}
      <div className="package-gallery">
        <img
          src={package_.images?.[0] || 'https://via.placeholder.com/1200x600?text=Package'}
          alt={package_.title}
          className="main-image"
        />
      </div>

      <div className="container">
        <div className="package-layout">
          {/* Main Content */}
          <div className="package-main">
            <div className="package-header">
              <div className="package-title-section">
                <h1>{package_.title}</h1>
                <div className="package-meta">
                  <span className="location"><FaMapMarkerAlt /> {package_.destination}</span>
                  <span className="rating"><FaStar /> {package_.rating || 0} ({package_.totalReviews || 0} reviews)</span>
                  <span className="category badge">{package_.category}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="package-tabs">
              <button
                className={activeTab === 'overview' ? 'active' : ''}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={activeTab === 'itinerary' ? 'active' : ''}
                onClick={() => setActiveTab('itinerary')}
              >
                Itinerary
              </button>
              <button
                className={activeTab === 'inclusions' ? 'active' : ''}
                onClick={() => setActiveTab('inclusions')}
              >
                Inclusions
              </button>
              <button
                className={activeTab === 'reviews' ? 'active' : ''}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({feedbacks.length})
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <h3>About this Package</h3>
                  <p>{package_.description}</p>
                  
                  <div className="package-highlights">
                    <div className="highlight-item">
                      <FaClock />
                      <div>
                        <h4>Duration</h4>
                        <p>{package_.duration.days} Days / {package_.duration.nights} Nights</p>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <FaUsers />
                      <div>
                        <h4>Max Capacity</h4>
                        <p>{package_.maxCapacity} People</p>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <FaMapMarkerAlt />
                      <div>
                        <h4>Difficulty</h4>
                        <p className="capitalize">{package_.difficulty}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="itinerary-content">
                  <h3>Day-wise Itinerary</h3>
                  {package_.itinerary && package_.itinerary.length > 0 ? (
                    <div className="itinerary-list">
                      {package_.itinerary.map((day) => (
                        <div key={day.day} className="itinerary-item">
                          <div className="day-number">Day {day.day}</div>
                          <div className="day-content">
                            <h4>{day.title}</h4>
                            <p>{day.description}</p>
                            {day.activities && day.activities.length > 0 && (
                              <ul className="activities">
                                {day.activities.map((activity, idx) => (
                                  <li key={idx}>{activity}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Itinerary details will be shared upon booking.</p>
                  )}
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div className="inclusions-content">
                  <div className="inclusions-grid">
                    <div className="inclusions-section">
                      <h3><FaCheck className="text-success" /> What's Included</h3>
                      <ul className="inclusions-list">
                        {package_.inclusions && package_.inclusions.length > 0 ? (
                          package_.inclusions.map((item, idx) => (
                            <li key={idx}><FaCheck /> {item}</li>
                          ))
                        ) : (
                          <li>Details will be provided</li>
                        )}
                      </ul>
                    </div>
                    <div className="exclusions-section">
                      <h3><FaTimes className="text-danger" /> What's Excluded</h3>
                      <ul className="exclusions-list">
                        {package_.exclusions && package_.exclusions.length > 0 ? (
                          package_.exclusions.map((item, idx) => (
                            <li key={idx}><FaTimes /> {item}</li>
                          ))
                        ) : (
                          <li>Details will be provided</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="reviews-content">
                  <h3>Customer Reviews</h3>
                  {feedbacks.length > 0 ? (
                    <div className="reviews-list">
                      {feedbacks.map((feedback) => (
                        <div key={feedback._id} className="review-item">
                          <div className="review-header">
                            <div className="reviewer-info">
                              <h4>{feedback.userId?.name || 'Anonymous'}</h4>
                              <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={i < feedback.rating ? 'filled' : ''} />
                                ))}
                              </div>
                            </div>
                            <span className="review-date">
                              {new Date(feedback.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="review-text">{feedback.review}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-reviews">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <aside className="booking-sidebar">
            <div className="booking-card">
              <div className="price-section">
                <span className="price-label">Starting from</span>
                <div className="price">₹{package_.price.toLocaleString()}</div>
                <span className="price-note">per person</span>
              </div>

              <div className="availability-status">
                {package_.availability ? (
                  <span className="available"><FaCheck /> Available</span>
                ) : (
                  <span className="unavailable"><FaTimes /> Not Available</span>
                )}
              </div>

              {package_.startDates && package_.startDates.length > 0 && (
                <div className="start-dates">
                  <h4><FaCalendar /> Available Dates</h4>
                  <div className="dates-list">
                    {package_.startDates.slice(0, 3).map((date, idx) => (
                      <div key={idx} className="date-item">
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button 
                className="btn btn-primary btn-block btn-lg" 
                onClick={handleBookNow}
                disabled={!package_.availability}
              >
                Book Now
              </button>

              <div className="booking-features">
                <div className="feature-item">
                  <FaCheck /> Best Price Guarantee
                </div>
                <div className="feature-item">
                  <FaCheck /> Instant Confirmation
                </div>
                <div className="feature-item">
                  <FaCheck /> 24/7 Support
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
