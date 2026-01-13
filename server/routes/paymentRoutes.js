import express from 'express';
import {
    initiatePayment,
    verifyPayment,
    manualPaymentVerification,
    getPaymentDetails,
    getUserPayments,
    getAllPayments,
    processRefund,
    getPaymentStats
} from '../controllers/paymentController.js';
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const paymentRouter = express.Router();

// User routes (protected)
paymentRouter.post('/initiate', userAuth, initiatePayment);
paymentRouter.post('/verify', verifyPayment); // Can be called by payment gateway callback
paymentRouter.get('/my-payments', userAuth, getUserPayments);
paymentRouter.get('/:id', userAuth, getPaymentDetails);

// Admin routes
paymentRouter.get('/admin/all', adminAuth, getAllPayments);
paymentRouter.post('/admin/manual-verify', adminAuth, manualPaymentVerification);
paymentRouter.post('/admin/refund', adminAuth, processRefund);
paymentRouter.get('/admin/stats', adminAuth, getPaymentStats);

export default paymentRouter;
