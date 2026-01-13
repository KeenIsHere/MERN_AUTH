import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingAPI, paymentAPI } from '../config/api';
import { FaCreditCard, FaUniversity, FaMobileAlt, FaLock, FaCheckCircle } from 'react-icons/fa';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const response = await bookingAPI.getById(bookingId);
      if (response.data.success) {
        setBooking(response.data.booking);
      }
    } catch (error) {
      setError('Failed to load booking details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Initiate payment
      const response = await paymentAPI.initiate({
        bookingId,
        amount: booking.totalAmount,
        paymentMethod,
      });

      if (response.data.success) {
        // For manual payment, we mark it as initiated and redirect
        alert('Payment initiated successfully! Our team will verify your payment soon.');
        navigate('/bookings');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const paymentOptions = [
    { value: 'upi', label: 'UPI Payment', icon: <FaMobileAlt />, color: '#5f6ac3' },
    { value: 'net_banking', label: 'Net Banking', icon: <FaUniversity />, color: '#0066cc' },
    { value: 'credit_card', label: 'Credit Card', icon: <FaCreditCard />, color: '#ff6b6b' },
    { value: 'debit_card', label: 'Debit Card', icon: <FaCreditCard />, color: '#4ecdc4' },
  ];

  if (!booking) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading payment details...</p>
      </div>
    );
  }

  return (
    <div className="payment-page-modern">
      <div className="payment-header-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="container payment-container">
        <div className="payment-title-section">
          <h1>💳 Secure Payment</h1>
          <p>Complete your booking payment securely</p>
        </div>

        <div className="payment-modern-layout">
          {/* Payment Form Section */}
          <div className="payment-form-modern">
            <div className="payment-security-badge">
              <FaLock /> <span>Secure & Encrypted Payment</span>
            </div>

            {error && (
              <div className="alert alert-error-modern">
                <span>⚠️</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="modern-payment-form">
              <div className="payment-methods-section">
                <h3>Select Payment Method</h3>
                <div className="payment-methods-grid">
                  {paymentOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`payment-method-card ${paymentMethod === option.value ? 'selected' : ''}`}
                      style={{ '--method-color': option.color }}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={paymentMethod === option.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="method-icon" style={{ background: option.color }}>
                        {option.icon}
                      </div>
                      <span className="method-label">{option.label}</span>
                      {paymentMethod === option.value && (
                        <div className="selected-indicator">
                          <FaCheckCircle />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="payment-instructions-box">
                <h4>📋 Payment Instructions</h4>
                <div className="instructions-content">
                  <div className="instruction-step">
                    <span className="step-number">1</span>
                    <p>Click "Proceed to Pay" button below</p>
                  </div>
                  <div className="instruction-step">
                    <span className="step-number">2</span>
                    <p>Complete the payment using your selected method</p>
                  </div>
                  <div className="instruction-step">
                    <span className="step-number">3</span>
                    <p>Save your transaction ID for reference</p>
                  </div>
                  <div className="instruction-step">
                    <span className="step-number">4</span>
                    <p>Our team will verify within 24 hours</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-pay-now"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock />
                    Pay ₹{booking.totalAmount.toLocaleString()}
                  </>
                )}
              </button>

              <div className="payment-trust-badges">
                <span>🔒 256-bit SSL Encrypted</span>
                <span>✓ PCI DSS Compliant</span>
                <span>✓ 100% Secure</span>
              </div>
            </form>
          </div>

          {/* Payment Summary Section */}
          <aside className="payment-summary-modern">
            <div className="summary-card-modern">
              <h3>📝 Booking Summary</h3>
              
              <div className="package-preview">
                <div className="package-preview-image">
                  <img
                    src={booking.packageId?.images?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop'}
                    alt={booking.packageId?.title}
                  />
                </div>
                <h4>{booking.packageId?.title || 'Travel Package'}</h4>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-details-modern">
                <div className="detail-row-modern">
                  <span className="detail-label">📍 Destination</span>
                  <span className="detail-value">{booking.packageId?.destination}</span>
                </div>
                <div className="detail-row-modern">
                  <span className="detail-label">📅 Travel Date</span>
                  <span className="detail-value">
                    {new Date(booking.travelDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="detail-row-modern">
                  <span className="detail-label">⏱️ Duration</span>
                  <span className="detail-value">
                    {booking.packageId?.duration?.days}D / {booking.packageId?.duration?.nights}N
                  </span>
                </div>
                <div className="detail-row-modern">
                  <span className="detail-label">👥 Travelers</span>
                  <span className="detail-value">
                    {booking.numberOfPersons?.adults || 0} Adults, {booking.numberOfPersons?.children || 0} Children
                  </span>
                </div>

                <div className="summary-divider"></div>

                <div className="detail-row-modern total-row">
                  <span className="detail-label">Total Amount</span>
                  <span className="detail-value total-amount">
                    ₹{booking.totalAmount?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>

              <div className="summary-note">
                <p>💡 You will receive a confirmation email after payment verification</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Payment;
