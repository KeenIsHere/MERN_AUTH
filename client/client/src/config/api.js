import axios from 'axios';

// Prefer same-origin '/api' which is proxied by Vite in dev.
// Fallback to explicit base URL via env if provided.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  isAuth: () => api.post('/auth/is-auth'),
  sendVerifyOtp: () => api.post('/auth/send-verify-otp'),
  verifyAccount: (otp) => api.post('/auth/verify-account', { otp }),
  sendResetOtp: (email) => api.post('/auth/send-reset-otp', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

// User APIs
export const userAPI = {
  getData: () => api.get('/user/data'),
};

// Package APIs
export const packageAPI = {
  getAll: (params) => api.get('/packages/all', { params }),
  getById: (id) => api.get(`/packages/${id}`),
  search: (params) => api.get('/packages/search', { params }),
  getFeatured: () => api.get('/packages/featured'),
  create: (data) => api.post('/packages/create', data),
  update: (id, data) => api.put(`/packages/update/${id}`, data),
  delete: (id) => api.delete(`/packages/delete/${id}`),
};

// Booking APIs
export const bookingAPI = {
  create: (data) => api.post('/bookings/create', data),
  getUserBookings: (params) => api.get('/bookings/my-bookings', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  cancel: (id, reason) => api.put(`/bookings/cancel/${id}`, { reason }),
  // Admin
  getAll: (params) => api.get('/bookings/admin/all', { params }),
  updateStatus: (id, status) => api.put(`/bookings/admin/update-status/${id}`, { status }),
  getStats: () => api.get('/bookings/admin/stats'),
};

// Payment APIs
export const paymentAPI = {
  initiate: (data) => api.post('/payments/initiate', data),
  verify: (data) => api.post('/payments/verify', data),
  getUserPayments: (params) => api.get('/payments/my-payments', { params }),
  getById: (id) => api.get(`/payments/${id}`),
  // Admin
  getAll: (params) => api.get('/payments/admin/all', { params }),
  manualVerify: (data) => api.post('/payments/admin/manual-verify', data),
  refund: (data) => api.post('/payments/admin/refund', data),
  getStats: () => api.get('/payments/admin/stats'),
};

// Feedback APIs
export const feedbackAPI = {
  submit: (data) => api.post('/feedbacks/submit', data),
  getUserFeedbacks: (params) => api.get('/feedbacks/my-feedbacks', { params }),
  getPackageFeedbacks: (packageId, params) => api.get(`/feedbacks/package/${packageId}`, { params }),
  // Admin
  getAll: (params) => api.get('/feedbacks/admin/all', { params }),
  updateStatus: (id, data) => api.put(`/feedbacks/admin/update-status/${id}`, data),
  delete: (id) => api.delete(`/feedbacks/admin/delete/${id}`),
  getStats: () => api.get('/feedbacks/admin/stats'),
};

// Admin APIs
export const adminAPI = {
  getAllUsers: (params) => api.get('/user/admin/all-users', { params }),
  updateUserRole: (data) => api.put('/user/admin/update-role', data),
  deleteUser: (userId) => api.delete(`/user/admin/delete/${userId}`),
  getUserStats: () => api.get('/user/admin/stats'),
};

export default api;
