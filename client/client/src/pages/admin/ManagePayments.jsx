import { useState, useEffect } from 'react';
import { adminAPI } from '../../config/api';
import { FaSearch, FaCheck, FaTimes } from 'react-icons/fa';

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await adminAPI.getAllPayments();
      if (response.data.success) {
        setPayments(response.data.payments);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPayment = async (paymentId, transactionId) => {
    const txnId = prompt('Enter transaction ID for verification:', transactionId || '');
    if (txnId) {
      try {
        const response = await adminAPI.verifyPayment(paymentId, { transactionId: txnId });
        if (response.data.success) {
          alert('Payment verified successfully');
          fetchPayments();
        }
      } catch (error) {
        alert('Failed to verify payment');
      }
    }
  };

  const handleRejectPayment = async (paymentId) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      try {
        const response = await adminAPI.updatePaymentStatus(paymentId, 'failed');
        if (response.data.success) {
          alert('Payment rejected');
          fetchPayments();
        }
      } catch (error) {
        alert('Failed to reject payment');
      }
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesStatus = statusFilter === 'all' || payment.paymentStatus === statusFilter;
    const matchesSearch = payment._id.includes(searchTerm) ||
                          payment.bookingId?._id?.includes(searchTerm) ||
                          payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="manage-payments-page">
      <div className="container">
        <div className="page-header">
          <h1>Manage Payments</h1>
          <p>Verify and manage payment transactions</p>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by payment ID, booking ID or transaction ID..."
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
              className={statusFilter === 'completed' ? 'active' : ''}
              onClick={() => setStatusFilter('completed')}
            >
              Completed
            </button>
            <button
              className={statusFilter === 'failed' ? 'active' : ''}
              onClick={() => setStatusFilter('failed')}
            >
              Failed
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
                  <th>Payment ID</th>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment._id}>
                    <td>#{payment._id.substring(payment._id.length - 8)}</td>
                    <td>#{payment.bookingId?._id?.substring(payment.bookingId._id.length - 8)}</td>
                    <td>
                      <div>
                        <div>{payment.userId?.name}</div>
                        <small>{payment.userId?.email}</small>
                      </div>
                    </td>
                    <td>₹{payment.amount.toLocaleString()}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>{payment.transactionId || 'N/A'}</td>
                    <td>
                      <span className={`status-badge status-${payment.paymentStatus}`}>
                        {payment.paymentStatus}
                      </span>
                    </td>
                    <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      {payment.paymentStatus === 'pending' && (
                        <>
                          <button
                            className="btn-icon btn-success"
                            onClick={() => handleVerifyPayment(payment._id, payment.transactionId)}
                            title="Verify payment"
                          >
                            <FaCheck />
                          </button>
                          <button
                            className="btn-icon btn-danger"
                            onClick={() => handleRejectPayment(payment._id)}
                            title="Reject payment"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      {payment.paymentStatus !== 'pending' && (
                        <span className="text-muted">No actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPayments.length === 0 && (
              <div className="no-data">No payments found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePayments;
