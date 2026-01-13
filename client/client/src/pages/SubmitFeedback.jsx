import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingAPI, feedbackAPI } from '../config/api';
import { FaStar } from 'react-icons/fa';

const SubmitFeedback = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const response = await bookingAPI.getById(bookingId);
      if (response.data.success) {
        const bookingData = response.data.booking;
        if (bookingData.bookingStatus !== 'completed') {
          alert('You can only review completed bookings');
          navigate('/bookings');
          return;
        }
        setBooking(bookingData);
      }
    } catch (error) {
      alert('Failed to fetch booking details');
      navigate('/bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      alert('Please write at least 10 characters for your review');
      return;
    }

    setSubmitting(true);
    try {
      const response = await feedbackAPI.create({
        packageId: booking.packageId._id,
        bookingId: booking._id,
        rating,
        comment: comment.trim(),
      });

      if (response.data.success) {
        alert('Thank you for your feedback!');
        navigate('/bookings');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loading-spinner"><div className="spinner"></div></div>
      </div>
    );
  }

  return (
    <div className="feedback-page">
      <div className="container">
        <div className="feedback-container">
          <div className="feedback-header">
            <h1>Write a Review</h1>
            <p>Share your experience with other travelers</p>
          </div>

          <div className="booking-summary-card">
            <img
              src={booking.packageId?.images?.[0] || 'https://via.placeholder.com/300'}
              alt={booking.packageId?.title}
            />
            <div className="summary-details">
              <h3>{booking.packageId?.title}</h3>
              <p>📍 {booking.packageId?.destination}</p>
              <p>📅 Travel Date: {new Date(booking.travelDate).toLocaleDateString()}</p>
              <p>
                👥 Travelers: {booking.numberOfPersons.adults} Adults, {booking.numberOfPersons.children} Children
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="rating-section">
              <label>Your Rating</label>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <button
                      type="button"
                      key={starValue}
                      className={starValue <= (hover || rating) ? 'star-active' : 'star'}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <FaStar size={40} />
                    </button>
                  );
                })}
              </div>
              <p className="rating-text">
                {rating === 0 && 'Select your rating'}
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </p>
            </div>

            <div className="form-group">
              <label>Your Review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience... What did you like? What could be improved?"
                rows="6"
                required
                minLength="10"
              />
              <small>{comment.length} characters (minimum 10)</small>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/bookings')}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitFeedback;
