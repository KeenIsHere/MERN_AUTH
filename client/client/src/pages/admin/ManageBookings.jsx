import { useState, useEffect } from 'react';
import { adminAPI } from '../../config/api';
import { FaSearch } from 'react-icons/fa';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await adminAPI.getAllBookings();
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await adminAPI.updateBookingStatus(bookingId, newStatus);
      if (response.data.success) {
        alert('Booking status updated successfully');
        fetchBookings();
      }
    } catch (error) {
      alert('Failed to update booking status');
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === 'all' || booking.bookingStatus === statusFilter;
    const matchesSearch = booking.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.packageId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking._id.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="manage-bookings-page">
      <div className="container">
        <div className="page-header">
          <h1>Manage Bookings</h1>
          <p>View and update booking statuses</p>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by user, package or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="status-filters">
            <button
              className={statusFilter === 'all' ? 'active' : ''}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            <button
              className={statusFilter === 'pending' ? 'active' : ''}
              onClick={() => setStatusFilter('pending')}
            >
              Pending
            </button>
            <button
              className={statusFilter === 'confirmed' ? 'active' : ''}
              onClick={() => setStatusFilter('confirmed')}
            >
              Confirmed
            </button>
            <button
              className={statusFilter === 'completed' ? 'active' : ''}
              onClick={() => setStatusFilter('completed')}
            >
              Completed
            </button>
            <button
              className={statusFilter === 'cancelled' ? 'active' : ''}
              onClick={() => setStatusFilter('cancelled')}
            >
              Cancelled
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner"><div className="spinner"></div></div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Package</th>
                  <th>Travel Date</th>
                  <th>Travelers</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>#{booking._id.substring(booking._id.length - 8)}</td>
                    <td>
                      <div>
                        <div>{booking.userId?.name}</div>
                        <small>{booking.userId?.email}</small>
                      </div>
                    </td>
                    <td>{booking.packageId?.title}</td>
                    <td>{new Date(booking.travelDate).toLocaleDateString()}</td>
                    <td>
                      {booking.numberOfPersons.adults}A / {booking.numberOfPersons.children}C
                    </td>
                    <td>₹{booking.totalAmount.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge status-${booking.bookingStatus}`}>
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td className="actions">
                      <select
                        value={booking.bookingStatus}
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBookings.length === 0 && (
              <div className="no-data">No bookings found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
