import { useState, useEffect } from 'react';
import { adminAPI, packageAPI } from '../../config/api';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destination: '',
    duration: { days: 0, nights: 0 },
    price: 0,
    category: 'adventure',
    maxGroupSize: 10,
    images: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await adminAPI.getAllPackages();
      if (response.data.success) {
        setPackages(response.data.packages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePackage = async (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        const response = await packageAPI.delete(packageId);
        if (response.data.success) {
          alert('Package deleted successfully');
          fetchPackages();
        }
      } catch (error) {
        alert('Failed to delete package');
      }
    }
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      description: pkg.description,
      destination: pkg.destination,
      duration: pkg.duration,
      price: pkg.price,
      category: pkg.category,
      maxGroupSize: pkg.maxGroupSize,
      images: pkg.images.join(', '),
      itinerary: pkg.itinerary?.map(item => `${item.day}: ${item.title} - ${item.description}`).join('\n') || '',
      inclusions: pkg.inclusions?.join('\n') || '',
      exclusions: pkg.exclusions?.join('\n') || '',
    });
    setShowCreateModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'days' || name === 'nights') {
      setFormData({
        ...formData,
        duration: { ...formData.duration, [name]: parseInt(value) },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const packageData = {
      ...formData,
      price: parseFloat(formData.price),
      maxGroupSize: parseInt(formData.maxGroupSize),
      images: formData.images.split(',').map(img => img.trim()),
      inclusions: formData.inclusions.split('\n').filter(item => item.trim()),
      exclusions: formData.exclusions.split('\n').filter(item => item.trim()),
      itinerary: formData.itinerary.split('\n').filter(item => item.trim()).map((item, index) => {
        const parts = item.split(':');
        const titleDesc = parts[1]?.split('-') || [];
        return {
          day: index + 1,
          title: titleDesc[0]?.trim() || 'Day Activity',
          description: titleDesc[1]?.trim() || '',
        };
      }),
    };

    try {
      let response;
      if (editingPackage) {
        response = await packageAPI.update(editingPackage._id, packageData);
      } else {
        response = await packageAPI.create(packageData);
      }

      if (response.data.success) {
        alert(`Package ${editingPackage ? 'updated' : 'created'} successfully!`);
        setShowCreateModal(false);
        setEditingPackage(null);
        fetchPackages();
      }
    } catch (error) {
      alert(`Failed to ${editingPackage ? 'update' : 'create'} package`);
    }
  };

  return (
    <div className="manage-packages-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Manage Packages</h1>
            <p>Create, edit and delete travel packages</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingPackage(null);
              setFormData({
                title: '',
                description: '',
                destination: '',
                duration: { days: 0, nights: 0 },
                price: 0,
                category: 'adventure',
                maxGroupSize: 10,
                images: '',
                itinerary: '',
                inclusions: '',
                exclusions: '',
              });
              setShowCreateModal(true);
            }}
          >
            <FaPlus /> Create Package
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner"><div className="spinner"></div></div>
        ) : (
          <div className="packages-grid">
            {packages.map((pkg) => (
              <div key={pkg._id} className="package-admin-card">
                <div className="package-image">
                  <img src={pkg.images[0]} alt={pkg.title} />
                  <span className="category-badge">{pkg.category}</span>
                </div>
                <div className="package-details">
                  <h3>{pkg.title}</h3>
                  <p className="destination">📍 {pkg.destination}</p>
                  <p className="duration">
                    🕒 {pkg.duration.days}D/{pkg.duration.nights}N
                  </p>
                  <p className="price">₹{pkg.price.toLocaleString()}</p>
                  <div className="package-actions">
                    <Link to={`/packages/${pkg._id}`} className="btn-icon btn-info">
                      <FaEye /> View
                    </Link>
                    <button
                      className="btn-icon btn-primary"
                      onClick={() => handleEditPackage(pkg)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn-icon btn-danger"
                      onClick={() => handleDeletePackage(pkg._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateModal && (
          <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingPackage ? 'Edit Package' : 'Create New Package'}</h2>
                <button className="modal-close" onClick={() => setShowCreateModal(false)}>×</button>
              </div>
              <form onSubmit={handleSubmit} className="package-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Package Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Destination *</label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Days *</label>
                    <input
                      type="number"
                      name="days"
                      value={formData.duration.days}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nights *</label>
                    <input
                      type="number"
                      name="nights"
                      value={formData.duration.nights}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="adventure">Adventure</option>
                      <option value="beach">Beach</option>
                      <option value="cultural">Cultural</option>
                      <option value="wildlife">Wildlife</option>
                      <option value="hill-station">Hill Station</option>
                      <option value="religious">Religious</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Max Group Size *</label>
                    <input
                      type="number"
                      name="maxGroupSize"
                      value={formData.maxGroupSize}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Image URLs (comma-separated) *</label>
                  <textarea
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                    rows="2"
                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Inclusions (one per line)</label>
                  <textarea
                    name="inclusions"
                    value={formData.inclusions}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Hotel accommodation&#10;Daily breakfast&#10;Airport transfers"
                  />
                </div>

                <div className="form-group">
                  <label>Exclusions (one per line)</label>
                  <textarea
                    name="exclusions"
                    value={formData.exclusions}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Personal expenses&#10;Travel insurance"
                  />
                </div>

                <div className="form-group">
                  <label>Itinerary (format: Day: Title - Description, one per line)</label>
                  <textarea
                    name="itinerary"
                    value={formData.itinerary}
                    onChange={handleChange}
                    rows="6"
                    placeholder="1: Arrival - Check-in to hotel and evening leisure&#10;2: Sightseeing - Full day city tour"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingPackage ? 'Update Package' : 'Create Package'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePackages;
