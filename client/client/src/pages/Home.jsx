import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { packageAPI } from '../config/api';
import { FaSearch, FaStar, FaClock, FaMapMarkerAlt, FaUsers, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPackages();
  }, []);

  const fetchFeaturedPackages = async () => {
    try {
      const response = await packageAPI.getFeatured();
      if (response.data.success) {
        setFeaturedPackages(response.data.packages);
      }
    } catch (error) {
      console.error('Error fetching featured packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      window.location.href = `/packages?search=${searchKeyword}`;
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your Next Adventure
          </h1>
          <p className="hero-subtitle">
            Explore incredible destinations with GHUMMGHAMM
          </p>

          {/* Search Bar */}
          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search destinations, packages..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="search-input"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          {/* Quick Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Packages</p>
            </div>
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Happy Travelers</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Destinations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Packages</h2>
            <p>Handpicked tours for an unforgettable experience</p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="packages-grid">
              {featuredPackages.map((pkg) => (
                <Link to={`/packages/${pkg._id}`} key={pkg._id} className="package-card">
                  <div className="package-image">
                    <img
                      src={pkg.images?.[0] || 'https://via.placeholder.com/400x300?text=Travel+Package'}
                      alt={pkg.title}
                    />
                    <div className="package-badge">{pkg.category}</div>
                  </div>
                  <div className="package-content">
                    <h3>{pkg.title}</h3>
                    <div className="package-location">
                      <FaMapMarkerAlt /> {pkg.destination}
                    </div>
                    <div className="package-details">
                      <span><FaClock /> {pkg.duration.days}D/{pkg.duration.nights}N</span>
                      <span className="package-rating">
                        <FaStar /> {pkg.rating || 0} ({pkg.totalReviews || 0})
                      </span>
                    </div>
                    <div className="package-footer">
                      <div className="package-price">
                        <span className="price-label">Starting from</span>
                        <span className="price">₹{pkg.price.toLocaleString()}</span>
                      </div>
                      <button className="btn btn-sm btn-primary">
                        View Details <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="section-footer">
            <Link to="/packages" className="btn btn-outline">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Explore by Category</h2>
            <p>Find your perfect travel experience</p>
          </div>

          <div className="categories-grid">
            <Link to="/packages?category=adventure" className="category-card">
              <div className="category-icon">🏔️</div>
              <h3>Adventure</h3>
            </Link>
            <Link to="/packages?category=beach" className="category-card">
              <div className="category-icon">🏖️</div>
              <h3>Beach</h3>
            </Link>
            <Link to="/packages?category=cultural" className="category-card">
              <div className="category-icon">🏛️</div>
              <h3>Cultural</h3>
            </Link>
            <Link to="/packages?category=honeymoon" className="category-card">
              <div className="category-icon">💑</div>
              <h3>Honeymoon</h3>
            </Link>
            <Link to="/packages?category=family" className="category-card">
              <div className="category-icon">👨‍👩‍👧‍👦</div>
              <h3>Family</h3>
            </Link>
            <Link to="/packages?category=wildlife" className="category-card">
              <div className="category-icon">🦁</div>
              <h3>Wildlife</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose GHUMMGHAMM</h2>
            <p>Your trusted travel partner</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✈️</div>
              <h3>Best Price Guarantee</h3>
              <p>Competitive prices with no hidden charges</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Booking</h3>
              <p>Safe and secure payment process</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Expert Planning</h3>
              <p>Carefully curated travel experiences</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Round the clock customer assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Book your dream vacation today!</p>
          <Link to="/packages" className="btn btn-primary btn-lg">
            Explore Packages
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
