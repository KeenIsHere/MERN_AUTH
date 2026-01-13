import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaPlane, FaUser, FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <FaPlane className="logo-icon" />
          <span>GHUMMGHAMM</span>
        </Link>

        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/packages" className="nav-link" onClick={() => setMenuOpen(false)}>
              Packages
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/bookings" className="nav-link" onClick={() => setMenuOpen(false)}>
                  My Bookings
                </Link>
              </li>
              {user?.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>
                    <MdDashboard /> Admin
                  </Link>
                </li>
              )}
              <li className="nav-item user-menu-wrapper">
                <button 
                  className="nav-link user-menu-btn" 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <FaUserCircle /> {user?.name}
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <Link to="/profile" onClick={() => { setUserMenuOpen(false); setMenuOpen(false); }}>
                      <FaUser /> Profile
                    </Link>
                    <Link to="/bookings" onClick={() => { setUserMenuOpen(false); setMenuOpen(false); }}>
                      <MdDashboard /> My Bookings
                    </Link>
                    <button onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link btn-primary" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
