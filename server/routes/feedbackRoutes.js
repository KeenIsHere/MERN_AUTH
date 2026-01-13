import express from 'express';
import {
    submitFeedback,
    getPackageFeedbacks,
    getUserFeedbacks,
    getAllFeedbacks,
    updateFeedbackStatus,
    deleteFeedback,
    getFeedbackStats
} from '../controllers/feedbackController.js';
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const feedbackRouter = express.Router();

// User routes
feedbackRouter.post('/submit', userAuth, submitFeedback);
feedbackRouter.get('/my-feedbacks', userAuth, getUserFeedbacks);

// Public routes
feedbackRouter.get('/package/:packageId', getPackageFeedbacks);

// Admin routes
feedbackRouter.get('/admin/all', adminAuth, getAllFeedbacks);
feedbackRouter.put('/admin/update-status/:id', adminAuth, updateFeedbackStatus);
feedbackRouter.delete('/admin/delete/:id', adminAuth, deleteFeedback);
feedbackRouter.get('/admin/stats', adminAuth, getFeedbackStats);

export default feedbackRouter;
