import paymentModel from '../models/paymentModel.js';
import bookingModel from '../models/bookingModel.js';

// Initiate payment
export const initiatePayment = async (req, res) => {
    try {
        const { bookingId, amount, paymentMethod } = req.body;
        const userId = req.body.userId;

        if (!bookingId || !amount || !paymentMethod) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Verify booking exists and belongs to user
        const booking = await bookingModel.findOne({ _id: bookingId, userId });
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Check if payment already exists for this booking
        const existingPayment = await paymentModel.findOne({ bookingId, status: { $in: ['success', 'pending'] } });
        if (existingPayment) {
            return res.status(400).json({ success: false, message: 'Payment already initiated for this booking' });
        }

        // Create payment record
        const newPayment = new paymentModel({
            bookingId,
            userId,
            amount,
            paymentMethod,
            status: 'initiated',
            description: `Payment for booking ${bookingId}`
        });

        await newPayment.save();

        // In real implementation, integrate with payment gateway (Razorpay, Stripe, etc.)
        // For now, returning payment details
        return res.status(201).json({
            success: true,
            message: 'Payment initiated successfully',
            payment: newPayment,
            // In real scenario, return payment gateway order ID and other details
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Verify payment (callback from payment gateway)
export const verifyPayment = async (req, res) => {
    try {
        const { paymentId, transactionId, status, paymentGatewayResponse } = req.body;

        if (!paymentId || !status) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const payment = await paymentModel.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        // Update payment status
        payment.status = status;
        payment.transactionId = transactionId;
        payment.paymentGatewayResponse = paymentGatewayResponse || {};
        
        if (status === 'success') {
            payment.paymentDate = new Date();
            
            // Update booking payment status
            await bookingModel.findByIdAndUpdate(
                payment.bookingId,
                { 
                    paymentStatus: 'completed',
                    bookingStatus: 'confirmed'
                }
            );
        }

        await payment.save();

        return res.status(200).json({
            success: true,
            message: `Payment ${status}`,
            payment
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Manual payment verification (for cash/offline payments - Admin only)
export const manualPaymentVerification = async (req, res) => {
    try {
        const { paymentId, transactionId } = req.body;

        if (!paymentId) {
            return res.status(400).json({ success: false, message: 'Payment ID is required' });
        }

        const payment = await paymentModel.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        payment.status = 'success';
        payment.transactionId = transactionId || `MANUAL_${Date.now()}`;
        payment.paymentDate = new Date();

        await payment.save();

        // Update booking
        await bookingModel.findByIdAndUpdate(
            payment.bookingId,
            { 
                paymentStatus: 'completed',
                bookingStatus: 'confirmed'
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            payment
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get payment details
export const getPaymentDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.body.userId;

        const payment = await paymentModel
            .findOne({ _id: id, userId })
            .populate('bookingId')
            .populate('userId', 'name email');

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        return res.status(200).json({
            success: true,
            payment
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get user's payment history
export const getUserPayments = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { page = 1, limit = 10 } = req.query;

        const payments = await paymentModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('bookingId', 'packageId travelDate totalAmount')
            .exec();

        const count = await paymentModel.countDocuments({ userId });

        return res.status(200).json({
            success: true,
            payments,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalPayments: count
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all payments (Admin only)
export const getAllPayments = async (req, res) => {
    try {
        const { status, page = 1, limit = 20, sort = '-createdAt' } = req.query;

        const query = {};
        if (status) query.status = status;

        const payments = await paymentModel
            .find(query)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('userId', 'name email')
            .populate({
                path: 'bookingId',
                populate: { path: 'packageId', select: 'title destination' }
            })
            .exec();

        const count = await paymentModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            payments,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalPayments: count
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Process refund (Admin only)
export const processRefund = async (req, res) => {
    try {
        const { paymentId, refundAmount, refundTransactionId } = req.body;

        if (!paymentId || !refundAmount) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const payment = await paymentModel.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        if (payment.status !== 'success') {
            return res.status(400).json({ success: false, message: 'Cannot refund unsuccessful payment' });
        }

        if (refundAmount > payment.amount) {
            return res.status(400).json({ success: false, message: 'Refund amount cannot exceed payment amount' });
        }

        payment.status = 'refunded';
        payment.refundAmount = refundAmount;
        payment.refundDate = new Date();
        payment.refundTransactionId = refundTransactionId || `REFUND_${Date.now()}`;

        await payment.save();

        // Update booking payment status
        await bookingModel.findByIdAndUpdate(
            payment.bookingId,
            { 
                paymentStatus: 'refunded',
                bookingStatus: 'refunded'
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Refund processed successfully',
            payment
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get payment statistics (Admin only)
export const getPaymentStats = async (req, res) => {
    try {
        const totalPayments = await paymentModel.countDocuments();
        const successfulPayments = await paymentModel.countDocuments({ status: 'success' });
        const failedPayments = await paymentModel.countDocuments({ status: 'failed' });
        const refundedPayments = await paymentModel.countDocuments({ status: 'refunded' });

        const revenueData = await paymentModel.aggregate([
            { $match: { status: 'success' } },
            { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
        ]);

        const refundData = await paymentModel.aggregate([
            { $match: { status: 'refunded' } },
            { $group: { _id: null, totalRefunds: { $sum: '$refundAmount' } } }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
        const totalRefunds = refundData.length > 0 ? refundData[0].totalRefunds : 0;

        return res.status(200).json({
            success: true,
            stats: {
                totalPayments,
                successfulPayments,
                failedPayments,
                refundedPayments,
                totalRevenue,
                totalRefunds,
                netRevenue: totalRevenue - totalRefunds
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
