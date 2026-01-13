import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { packageAPI } from '../config/api';
import { FaSearch, FaStar, FaClock, FaMapMarkerAlt, FaFilter, FaUsers, FaHeart, FaRegHeart } from 'react-icons/fa';

const Packages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    destination: searchParams.get('destination') || '',
    minPrice: '',
    maxPrice: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleFavorite = (packageId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(packageId)) {
        newFavorites.delete(packageId);
      } else {
        newFavorites.add(packageId);
      }
      return newFavorites;
    });
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.destination) params.destination = filters.destination;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      let response;
      if (filters.search) {
        response = await packageAPI.search({ keyword: filters.search, ...params });
      } else {
        response = await packageAPI.getAll(params);
      }

      if (response.data.success) {
        setPackages(response.data.packages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPackages();
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      destination: '',
      minPrice: '',
      maxPrice: '',
    });
    setSearchParams({});
  };

  return (
    <div className="packages-page">
      <div className="page-header">
        <h1>Explore Travel Packages</h1>
        <p>Find your perfect adventure</p>
      </div>

      <div className="container">
        <div className="packages-layout">
          {/* Sidebar Filters */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button onClick={() => setShowFilters(false)} className="close-filters">×</button>
            </div>

            <form onSubmit={handleSearch} className="filters-form">
              <div className="filter-group">
                <label>Search</label>
                <input
                  type="text"
                  name="search"
                  placeholder="Search packages..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-group">
                <label>Category</label>
                <select name="category" value={filters.category} onChange={handleFilterChange}>
                  <option value="">All Categories</option>
                  <option value="adventure">Adventure</option>
                  <option value="beach">Beach</option>
                  <option value="cultural">Cultural</option>
                  <option value="honeymoon">Honeymoon</option>
                  <option value="family">Family</option>
                  <option value="wildlife">Wildlife</option>
                  <option value="pilgrimage">Pilgrimage</option>
                  <option value="luxury">Luxury</option>
                  <option value="budget">Budget</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  placeholder="e.g., Goa, Kerala"
                  value={filters.destination}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-group">
                <label>Price Range</label>
                <div className="price-inputs">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Apply Filters
              </button>
              <button type="button" onClick={clearFilters} className="btn btn-outline btn-block">
                Clear All
              </button>
            </form>
          </aside>

          {/* Main Content */}
          <main className="packages-main">
            <div className="packages-toolbar">
              <button className="filter-toggle" onClick={() => setShowFilters(true)}>
                <FaFilter /> Filters
              </button>
              <p className="results-count">
                {packages.length} packages found
              </p>
            </div>

            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : packages.length > 0 ? (
              <div className="packages-grid">
                {packages.map((pkg) => (
                  <div key={pkg._id} className="package-card-modern">
                    <div className="package-image-wrapper">
                      <img
                        src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop'}
                        alt={pkg.title}
                        className="package-main-image"
                      />
                      <div className="package-overlay"></div>
                      <button 
                        className="favorite-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(pkg._id);
                        }}
                      >
                        {favorites.has(pkg._id) ? <FaHeart /> : <FaRegHeart />}
                      </button>
                      <div className="package-category-badge">{pkg.category}</div>
                      {pkg.availability && <div className="available-badge">Available Now</div>}
                    </div>
                    
                    <div className="package-card-body">
                      <div className="package-header">
                        <h3 className="package-title">{pkg.title}</h3>
                        <div className="package-rating-badge">
                          <FaStar className="star-icon" />
                          <span>{pkg.rating || 4.5}</span>
                        </div>
                      </div>

                      <div className="package-location-tag">
                        <FaMapMarkerAlt className="location-icon" />
                        <span>{pkg.destination}</span>
                      </div>

                      <p className="package-description-text">
                        {pkg.description.substring(0, 120)}...
                      </p>

                      <div className="package-meta-info">
                        <div className="meta-item">
                          <FaClock className="meta-icon" />
                          <span>{pkg.duration.days}D / {pkg.duration.nights}N</span>
                        </div>
                        <div className="meta-item">
                          <FaUsers className="meta-icon" />
                          <span>{pkg.groupSize || 'Max 20'} people</span>
                        </div>
                      </div>

                      <div className="package-card-footer">
                        <div className="price-section">
                          <span className="price-from">From</span>
                          <div className="price-amount">
                            <span className="currency">₹</span>
                            <span className="amount">{pkg.price.toLocaleString()}</span>
                          </div>
                          <span className="price-per">per person</span>
                        </div>
                        <Link to={`/packages/${pkg._id}`} className="view-details-btn">
                          View Details
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No packages found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Packages;
