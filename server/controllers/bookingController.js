import bookingModel from '../models/bookingModel.js';
import packageModel from '../models/packageModel.js';

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { packageId, travelDate, numberOfPersons, contactDetails, specialRequests } = req.body;
        const userId = req.body.userId;

        if (!packageId || !travelDate || !numberOfPersons || !contactDetails) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Check if package exists and is available
        const package_ = await packageModel.findById(packageId);
        if (!package_) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        if (!package_.availability) {
            return res.status(400).json({ success: false, message: 'Package is not available' });
        }

        // Calculate total amount
        const totalPersons = numberOfPersons.adults + (numberOfPersons.children || 0);
        const totalAmount = package_.price * totalPersons;

        const newBooking = new bookingModel({
            userId,
            packageId,
            travelDate,
            numberOfPersons,
            totalAmount,
            contactDetails,
            specialRequests: specialRequests || ''
        });

        await newBooking.save();

        return res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking: newBooking
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { status, page = 1, limit = 10 } = req.query;

        const query = { userId };
        if (status) query.bookingStatus = status;

        const bookings = await bookingModel
            .find(query)
            .sort({ bookingDate: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('packageId', 'title destination price duration images')
            .exec();

        const count = await bookingModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            bookings,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalBookings: count
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get single booking details
export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.body.userId;

        const booking = await bookingModel
            .findOne({ _id: id, userId })
            .populate('packageId')
            .populate('userId', 'name email');

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        return res.status(200).json({
            success: true,
            booking
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const userId = req.body.userId;

        const booking = await bookingModel.findOne({ _id: id, userId });

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if (booking.bookingStatus === 'cancelled') {
            return res.status(400).json({ success: false, message: 'Booking already cancelled' });
        }

        if (booking.bookingStatus === 'completed') {
            return res.status(400).json({ success: false, message: 'Cannot cancel completed booking' });
        }

        booking.bookingStatus = 'cancelled';
        booking.cancellationReason = reason || 'User cancelled';
        booking.cancelledAt = new Date();

        await booking.save();

        return res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
            booking
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update booking status (Admin only)
export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }

        const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed', 'refunded'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const booking = await bookingModel.findByIdAndUpdate(
            id,
            { bookingStatus: status },
            { new: true }
        ).populate('packageId', 'title destination');

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Booking status updated successfully',
            booking
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all bookings (Admin only)
export const getAllBookings = async (req, res) => {
    try {
        const { status, page = 1, limit = 20, sort = '-bookingDate' } = req.query;

        const query = {};
        if (status) query.bookingStatus = status;

        const bookings = await bookingModel
            .find(query)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('userId', 'name email')
            .populate('packageId', 'title destination price')
            .exec();

        const count = await bookingModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            bookings,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalBookings: count
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get booking statistics (Admin only)
export const getBookingStats = async (req, res) => {
    try {
        const totalBookings = await bookingModel.countDocuments();
        const confirmedBookings = await bookingModel.countDocuments({ bookingStatus: 'confirmed' });
        const cancelledBookings = await bookingModel.countDocuments({ bookingStatus: 'cancelled' });
        const pendingBookings = await bookingModel.countDocuments({ bookingStatus: 'pending' });
        
        const revenueData = await bookingModel.aggregate([
            { $match: { paymentStatus: 'completed' } },
            { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        return res.status(200).json({
            success: true,
            stats: {
                totalBookings,
                confirmedBookings,
                cancelledBookings,
                pendingBookings,
                totalRevenue
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
