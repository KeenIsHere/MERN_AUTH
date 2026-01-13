import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="modern-footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="footer-content-wrapper">
        <div className="footer-main-content">
          {/* Brand Section */}
          <div className="footer-brand-section">
            <div className="footer-logo">
              <h2>✈️ GHUMMGHAMM</h2>
            </div>
            <p className="footer-tagline">
              Discover the world with us. Creating unforgettable travel experiences across incredible destinations.
            </p>
            
            {/* Newsletter */}
            <div className="newsletter-box">
              <h4>Subscribe to our Newsletter</h4>
              <p>Get the latest travel deals and updates</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">
                  <FaPaperPlane />
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div className="social-media-section">
              <h4>Follow Us</h4>
              <div className="social-icons-modern">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-section">
            <h4>Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/">🏠 Home</Link></li>
              <li><Link to="/packages">📦 Packages</Link></li>
              <li><Link to="/bookings">📅 My Bookings</Link></li>
              <li><Link to="/profile">👤 Profile</Link></li>
              <li><Link to="/feedback">💬 Feedback</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="footer-links-section">
            <h4>Popular Destinations</h4>
            <ul className="footer-links-list">
              <li><Link to="/packages?destination=Goa">🏖️ Goa</Link></li>
              <li><Link to="/packages?destination=Kerala">🌴 Kerala</Link></li>
              <li><Link to="/packages?destination=Rajasthan">🏰 Rajasthan</Link></li>
              <li><Link to="/packages?destination=Himachal">⛰️ Himachal Pradesh</Link></li>
              <li><Link to="/packages?destination=Kashmir">🏔️ Kashmir</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact-section">
            <h4>Contact Us</h4>
            <div className="contact-info-modern">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Phone</span>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Email</span>
                  <a href="mailto:info@ghummghamm.com">info@ghummghamm.com</a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Address</span>
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom-modern">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} <strong>GHUMMGHAMM</strong>. All rights reserved. Made with ❤️ in India
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="separator">•</span>
              <Link to="/terms">Terms of Service</Link>
              <span className="separator">•</span>
              <Link to="/refund">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
