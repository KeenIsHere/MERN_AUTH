import express from 'express';
import {
    createBooking,
    getUserBookings,
    getBookingById,
    cancelBooking,
    updateBookingStatus,
    getAllBookings,
    getBookingStats
} from '../controllers/bookingController.js';
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const bookingRouter = express.Router();

// User routes (protected)
bookingRouter.post('/create', userAuth, createBooking);
bookingRouter.get('/my-bookings', userAuth, getUserBookings);
bookingRouter.get('/:id', userAuth, getBookingById);
bookingRouter.put('/cancel/:id', userAuth, cancelBooking);

// Admin routes
bookingRouter.get('/admin/all', adminAuth, getAllBookings);
bookingRouter.put('/admin/update-status/:id', adminAuth, updateBookingStatus);
bookingRouter.get('/admin/stats', adminAuth, getBookingStats);

export default bookingRouter;
