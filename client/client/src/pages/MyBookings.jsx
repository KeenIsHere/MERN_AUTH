import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../config/api';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaClock } from 'react-icons/fa';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await bookingAPI.getUserBookings(params);
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      cancelled: 'status-cancelled',
      completed: 'status-completed',
    };
    return statusClasses[status] || '';
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const response = await bookingAPI.cancel(bookingId, 'User cancellation');
        if (response.data.success) {
          alert('Booking cancelled successfully');
          fetchBookings();
        }
      } catch (error) {
        alert('Failed to cancel booking');
      }
    }
  };

  return (
    <div className="my-bookings-page">
      <div className="container">
        <div className="page-header">
          <h1>My Bookings</h1>
        </div>

        <div className="bookings-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={filter === 'confirmed' ? 'active' : ''}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={filter === 'cancelled' ? 'active' : ''}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner"><div className="spinner"></div></div>
        ) : bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <div className="booking-id">
                    Booking #{booking._id.substring(booking._id.length - 8)}
                  </div>
                  <span className={`booking-status ${getStatusClass(booking.bookingStatus)}`}>
                    {booking.bookingStatus}
                  </span>
                </div>

                <div className="booking-content">
                  <div className="package-info">
                    <img
                      src={booking.packageId?.images?.[0] || 'https://via.placeholder.com/150'}
                      alt={booking.packageId?.title}
                    />
                    <div>
                      <h3>{booking.packageId?.title || 'Package'}</h3>
                      <p><FaMapMarkerAlt /> {booking.packageId?.destination}</p>
                    </div>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      <FaCalendar />
                      <div>
                        <span className="detail-label">Travel Date</span>
                        <span className="detail-value">{new Date(booking.travelDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FaUsers />
                      <div>
                        <span className="detail-label">Travelers</span>
                        <span className="detail-value">
                          {booking.numberOfPersons.adults + booking.numberOfPersons.children} persons
                        </span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <span>💰</span>
                      <div>
                        <span className="detail-label">Total Amount</span>
                        <span className="detail-value">₹{booking.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="booking-actions">
                    <Link to={`/bookings/${booking._id}`} className="btn btn-outline">
                      View Details
                    </Link>
                    {booking.bookingStatus === 'pending' && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="btn btn-danger"
                      >
                        Cancel Booking
                      </button>
                    )}
                    {booking.bookingStatus === 'completed' && (
                      <Link to={`/feedback/${booking._id}`} className="btn btn-primary">
                        Write Review
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <h3>No bookings found</h3>
            <p>Start exploring our amazing packages!</p>
            <Link to="/packages" className="btn btn-primary">Browse Packages</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
