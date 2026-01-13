import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { packageAPI, bookingAPI } from '../config/api';
import { FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';

const BookPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [package_, setPackage] = useState(null);
  const [formData, setFormData] = useState({
    travelDate: '',
    adults: 1,
    children: 0,
    phone: '',
    email: '',
    alternatePhone: '',
    specialRequests: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPackage();
  }, [id]);

  const fetchPackage = async () => {
    try {
      const response = await packageAPI.getById(id);
      if (response.data.success) {
        setPackage(response.data.package);
      }
    } catch (error) {
      setError('Failed to load package details');
    }
  };

  const calculateTotal = () => {
    if (!package_) return 0;
    const totalPersons = parseInt(formData.adults) + parseInt(formData.children);
    return package_.price * totalPersons;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const bookingData = {
        packageId: id,
        travelDate: formData.travelDate,
        numberOfPersons: {
          adults: parseInt(formData.adults),
          children: parseInt(formData.children),
        },
        contactDetails: {
          phone: formData.phone,
          email: formData.email,
          alternatePhone: formData.alternatePhone,
        },
        specialRequests: formData.specialRequests,
      };

      const response = await bookingAPI.create(bookingData);
      if (response.data.success) {
        navigate(`/payment/${response.data.booking._id}`);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!package_) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="booking-page">
      <div className="container">
        <h1>Complete Your Booking</h1>

        <div className="booking-layout">
          <div className="booking-form-section">
            <form onSubmit={handleSubmit} className="booking-form">
              <h2>Booking Details</h2>

              {error && <div className="alert alert-error">{error}</div>}

              <div className="form-group">
                <label>Travel Date *</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Adults *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Children</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Alternate Phone</label>
                <input
                  type="tel"
                  value={formData.alternatePhone}
                  onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Special Requests</label>
                <textarea
                  rows="4"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Any special requirements or requests..."
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>

          <aside className="booking-summary">
            <div className="summary-card">
              <h3>Booking Summary</h3>
              
              <div className="package-info">
                <h4>{package_.title}</h4>
                <p><FaMapMarkerAlt /> {package_.destination}</p>
                <p><FaClock /> {package_.duration.days}D/{package_.duration.nights}N</p>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Price per person</span>
                  <span>₹{package_.price.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>Number of persons</span>
                  <span>{parseInt(formData.adults) + parseInt(formData.children)}</span>
                </div>
                <div className="price-row total">
                  <span>Total Amount</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BookPackage;
