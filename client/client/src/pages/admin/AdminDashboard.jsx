import { useState, useEffect } from 'react';
import { adminAPI } from '../../config/api';
import { FaUsers, FaBox, FaMoneyBill, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    packages: 0,
    bookings: 0,
    payments: 0,
    feedbacks: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, packagesRes, bookingsRes, paymentsRes, feedbacksRes] = await Promise.all([
        adminAPI.getAllUsers(),
        adminAPI.getAllPackages(),
        adminAPI.getAllBookings(),
        adminAPI.getAllPayments(),
        adminAPI.getAllFeedbacks(),
      ]);

      setStats({
        users: usersRes.data.users?.length || 0,
        packages: packagesRes.data.packages?.length || 0,
        bookings: bookingsRes.data.bookings?.length || 0,
        payments: paymentsRes.data.payments?.length || 0,
        feedbacks: feedbacksRes.data.feedbacks?.length || 0,
      });

      setRecentBookings(bookingsRes.data.bookings?.slice(0, 5) || []);
      setRecentPayments(paymentsRes.data.payments?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your travel agency</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon users">
              <FaUsers size={30} />
            </div>
            <div className="stat-info">
              <h3>{stats.users}</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon packages">
              <FaBox size={30} />
            </div>
            <div className="stat-info">
              <h3>{stats.packages}</h3>
              <p>Total Packages</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bookings">
              <FaMoneyBill size={30} />
            </div>
            <div className="stat-info">
              <h3>{stats.bookings}</h3>
              <p>Total Bookings</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon payments">
              <FaMoneyBill size={30} />
            </div>
            <div className="stat-info">
              <h3>{stats.payments}</h3>
              <p>Payments</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon feedbacks">
              <FaStar size={30} />
            </div>
            <div className="stat-info">
              <h3>{stats.feedbacks}</h3>
              <p>Reviews</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Bookings</h2>
              <Link to="/admin/bookings" className="btn btn-sm">View All</Link>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>User</th>
                    <th>Package</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>#{booking._id.substring(booking._id.length - 6)}</td>
                      <td>{booking.userId?.name}</td>
                      <td>{booking.packageId?.title}</td>
                      <td>{new Date(booking.travelDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge status-${booking.bookingStatus}`}>
                          {booking.bookingStatus}
                        </span>
                      </td>
                      <td>₹{booking.totalAmount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Payments</h2>
              <Link to="/admin/payments" className="btn btn-sm">View All</Link>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Booking ID</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((payment) => (
                    <tr key={payment._id}>
                      <td>#{payment._id.substring(payment._id.length - 6)}</td>
                      <td>#{payment.bookingId?._id?.substring(payment.bookingId._id.length - 6)}</td>
                      <td>₹{payment.amount.toLocaleString()}</td>
                      <td>{payment.paymentMethod}</td>
                      <td>
                        <span className={`status-badge status-${payment.paymentStatus}`}>
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/admin/users" className="action-card">
              <FaUsers size={40} />
              <h3>Manage Users</h3>
              <p>View and manage user accounts</p>
            </Link>
            <Link to="/admin/packages" className="action-card">
              <FaBox size={40} />
              <h3>Manage Packages</h3>
              <p>Add, edit or remove packages</p>
            </Link>
            <Link to="/admin/bookings" className="action-card">
              <FaMoneyBill size={40} />
              <h3>Manage Bookings</h3>
              <p>View and update bookings</p>
            </Link>
            <Link to="/admin/payments" className="action-card">
              <FaMoneyBill size={40} />
              <h3>Verify Payments</h3>
              <p>Verify and manage payments</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
