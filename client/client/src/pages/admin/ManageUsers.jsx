import { useState, useEffect } from 'react';
import { adminAPI } from '../../config/api';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getAllUsers();
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await adminAPI.deleteUser(userId);
        if (response.data.success) {
          alert('User deleted successfully');
          fetchUsers();
        }
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Change user role to ${newRole}?`)) {
      try {
        const response = await adminAPI.updateUser(userId, { role: newRole });
        if (response.data.success) {
          alert('User role updated successfully');
          fetchUsers();
        }
      } catch (error) {
        alert('Failed to update user role');
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="manage-users-page">
      <div className="container">
        <div className="page-header">
          <h1>Manage Users</h1>
          <p>View and manage user accounts</p>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="role-filters">
            <button
              className={roleFilter === 'all' ? 'active' : ''}
              onClick={() => setRoleFilter('all')}
            >
              All Users
            </button>
            <button
              className={roleFilter === 'user' ? 'active' : ''}
              onClick={() => setRoleFilter('user')}
            >
              Users
            </button>
            <button
              className={roleFilter === 'admin' ? 'active' : ''}
              onClick={() => setRoleFilter('admin')}
            >
              Admins
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Verified</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || 'N/A'}</td>
                    <td>
                      <span className={`role-badge role-${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={user.isAccountVerified ? 'status-verified' : 'status-unverified'}>
                        {user.isAccountVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      <button
                        className="btn-icon btn-primary"
                        onClick={() => handleToggleRole(user._id, user.role)}
                        title={`Change to ${user.role === 'admin' ? 'user' : 'admin'}`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-icon btn-danger"
                        onClick={() => handleDeleteUser(user._id)}
                        title="Delete user"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="no-data">No users found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
