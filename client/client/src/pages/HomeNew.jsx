import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { packageAPI } from '../config/api';
import { FaSearch, FaArrowRight, FaMapMarkerAlt, FaClock, FaUsers, FaStar } from 'react-icons/fa';

const Home = () => {
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPackages();
  }, []);

  const fetchFeaturedPackages = async () => {
    try {
      const response = await packageAPI.getAll({ limit: 6 });
      if (response.data.success) {
        setFeaturedPackages(response.data.packages.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/packages?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const categories = [
    { name: 'Adventure', emoji: '🏔️', description: 'Thrilling expeditions' },
    { name: 'Beach', emoji: '🏖️', description: 'Tropical paradise' },
    { name: 'Cultural', emoji: '🏛️', description: 'Heritage tours' },
    { name: 'Honeymoon', emoji: '💑', description: 'Romantic getaways' },
    { name: 'Family', emoji: '👨‍👩‍👧‍👦', description: 'Fun for everyone' },
    { name: 'Wildlife', emoji: '🦁', description: 'Nature encounters' },
  ];

  const features = [
    {
      icon: '💰',
      title: 'Best Price Guarantee',
      description: 'We ensure you get the best value for your money with no hidden charges.'
    },
    {
      icon: '🛡️',
      title: 'Secure Booking',
      description: 'Your data is safe with our encrypted and secure payment process.'
    },
    {
      icon: '⚡',
      title: 'Instant Confirmation',
      description: 'Get immediate booking confirmation via email and SMS.'
    },
    {
      icon: '🌍',
      title: 'Wide Selection',
      description: 'Choose from 500+ handpicked destinations across the globe.'
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="slide-up">Discover Your Next Adventure</h1>
            <p className="slide-up">Explore incredible destinations with GHUMMGHAMM - Your trusted travel partner</p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hero-search">
              <div className="search-box-hero">
                <input
                  type="text"
                  placeholder="Search destinations, packages, experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                  <FaSearch /> Search
                </button>
              </div>
            </form>

            {/* Stats */}
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">500+</div>
                <div className="hero-stat-label">Travel Packages</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">10K+</div>
                <div className="hero-stat-label">Happy Travelers</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">50+</div>
                <div className="hero-stat-label">Destinations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="section">
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
            <>
              <div className="grid grid-3">
                {featuredPackages.map((pkg) => (
                  <div key={pkg._id} className="package-card card">
                    <div className="package-card-image">
                      <img
                        src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600'}
                        alt={pkg.title}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600';
                        }}
                      />
                      <div className="package-badge">{pkg.category}</div>
                    </div>
                    <div className="package-card-content">
                      <h3 className="package-card-title">{pkg.title}</h3>
                      <div className="package-meta">
                        <span>
                          <FaMapMarkerAlt /> {pkg.destination}
                        </span>
                        <span>
                          <FaClock /> {pkg.duration.days}D/{pkg.duration.nights}N
                        </span>
                      </div>
                      <p className="package-description">
                        {pkg.description?.substring(0, 120)}...
                      </p>
                      <div className="package-footer">
                        <div className="package-price">
                          <span className="price-label">Starting from</span>
                          <span className="price-value">₹{pkg.price.toLocaleString()}</span>
                        </div>
                        <Link to={`/packages/${pkg._id}`} className="btn btn-primary btn-sm">
                          View Details <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '48px' }}>
                <Link to="/packages" className="btn btn-primary btn-lg">
                  View All Packages <FaArrowRight />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Explore by Category</h2>
            <p>Find your perfect travel experience</p>
          </div>

          <div className="grid grid-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/packages?category=${category.name.toLowerCase()}`}
                className="category-card"
              >
                <span className="category-icon">{category.emoji}</span>
                <h3 className="category-name">{category.name}</h3>
                <p style={{ color: 'var(--gray)', marginTop: '8px' }}>{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose GHUMMGHAMM</h2>
            <p>Your trusted travel partner for memorable journeys</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--gradient-primary)', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--white)', marginBottom: '24px' }}>
              Ready to Start Your Journey?
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '40px', color: 'rgba(255,255,255,0.95)' }}>
              Join thousands of happy travelers who discovered amazing destinations with us. 
              Book your dream vacation today!
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/packages" className="btn btn-lg" style={{ background: 'var(--white)', color: 'var(--primary)' }}>
                Explore Packages
              </Link>
              <Link to="/register" className="btn btn-outline btn-lg" style={{ borderColor: 'var(--white)', color: 'var(--white)' }}>
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
