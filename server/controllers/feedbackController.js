import feedbackModel from '../models/feedbackModel.js';
import bookingModel from '../models/bookingModel.js';
import packageModel from '../models/packageModel.js';
import mongoose from 'mongoose';

// Submit feedback
export const submitFeedback = async (req, res) => {
    try {
        const { packageId, bookingId, rating, review, images, categories } = req.body;
        const userId = req.body.userId;

        if (!packageId || !bookingId || !rating || !review) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Verify booking exists and belongs to user
        const booking = await bookingModel.findOne({ _id: bookingId, userId, packageId });
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found or unauthorized' });
        }

        // Check if booking is completed
        if (booking.bookingStatus !== 'completed') {
            return res.status(400).json({ success: false, message: 'Can only review completed bookings' });
        }

        // Check if feedback already exists
        const existingFeedback = await feedbackModel.findOne({ bookingId });
        if (existingFeedback) {
            return res.status(400).json({ success: false, message: 'Feedback already submitted for this booking' });
        }

        const newFeedback = new feedbackModel({
            userId,
            packageId,
            bookingId,
            rating,
            review,
            images: images || [],
            categories: categories || {},
            isVerified: true // Auto-verify since booking is completed
        });

        await newFeedback.save();

        // Update package rating
        await updatePackageRating(packageId);

        return res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            feedback: newFeedback
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Helper function to update package rating
const updatePackageRating = async (packageId) => {
    try {
        const feedbacks = await feedbackModel.find({ packageId, status: 'approved' });
        
        if (feedbacks.length > 0) {
            const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
            const avgRating = totalRating / feedbacks.length;

            await packageModel.findByIdAndUpdate(packageId, {
                rating: avgRating.toFixed(1),
                totalReviews: feedbacks.length
            });
        }
    } catch (error) {
        console.error('Error updating package rating:', error);
    }
};

// Get feedbacks for a package
export const getPackageFeedbacks = async (req, res) => {
    try {
        const { packageId } = req.params;
        const { page = 1, limit = 10, rating, sort = '-createdAt' } = req.query;

        const query = { packageId, status: 'approved' };
        if (rating) query.rating = Number(rating);

        const feedbacks = await feedbackModel
            .find(query)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('userId', 'name')
            .exec();

        const count = await feedbackModel.countDocuments(query);

        // Calculate rating distribution
        const ratingDistribution = await feedbackModel.aggregate([
            { $match: { packageId: mongoose.Types.ObjectId(packageId), status: 'approved' } },
            { $group: { _id: '$rating', count: { $sum: 1 } } },
            { $sort: { _id: -1 } }
        ]);

        return res.status(200).json({
            success: true,
            feedbacks,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalFeedbacks: count,
            ratingDistribution
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get user's feedbacks
export const getUserFeedbacks = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { page = 1, limit = 10 } = req.query;

        const feedbacks = await feedbackModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('packageId', 'title destination images')
            .exec();

        const count = await feedbackModel.countDocuments({ userId });

        return res.status(200).json({
            success: true,
            feedbacks,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalFeedbacks: count
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all feedbacks (Admin only)
export const getAllFeedbacks = async (req, res) => {
    try {
        const { status, page = 1, limit = 20, sort = '-createdAt' } = req.query;

        const query = {};
        if (status) query.status = status;

        const feedbacks = await feedbackModel
            .find(query)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('userId', 'name email')
            .populate('packageId', 'title destination')
            .exec();

        const count = await feedbackModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            feedbacks,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalFeedbacks: count
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update feedback status (Admin only)
export const updateFeedbackStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminResponse } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }

        const validStatuses = ['pending', 'approved', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const updateData = { status };
        if (adminResponse) {
            updateData.adminResponse = adminResponse;
            updateData.respondedAt = new Date();
        }

        const feedback = await feedbackModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('packageId', 'title');

        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }

        // Update package rating if feedback is approved or rejected
        if (status === 'approved' || status === 'rejected') {
            await updatePackageRating(feedback.packageId._id);
        }

        return res.status(200).json({
            success: true,
            message: 'Feedback status updated successfully',
            feedback
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete feedback (Admin only)
export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        const feedback = await feedbackModel.findByIdAndDelete(id);

        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }

        // Update package rating after deletion
        await updatePackageRating(feedback.packageId);

        return res.status(200).json({
            success: true,
            message: 'Feedback deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get feedback statistics (Admin only)
export const getFeedbackStats = async (req, res) => {
    try {
        const totalFeedbacks = await feedbackModel.countDocuments();
        const approvedFeedbacks = await feedbackModel.countDocuments({ status: 'approved' });
        const pendingFeedbacks = await feedbackModel.countDocuments({ status: 'pending' });
        const rejectedFeedbacks = await feedbackModel.countDocuments({ status: 'rejected' });

        const avgRatingData = await feedbackModel.aggregate([
            { $match: { status: 'approved' } },
            { $group: { _id: null, avgRating: { $avg: '$rating' } } }
        ]);

        const averageRating = avgRatingData.length > 0 ? avgRatingData[0].avgRating.toFixed(2) : 0;

        return res.status(200).json({
            success: true,
            stats: {
                totalFeedbacks,
                approvedFeedbacks,
                pendingFeedbacks,
                rejectedFeedbacks,
                averageRating
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
