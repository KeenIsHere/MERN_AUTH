import userModel from '../models/userModel.js';

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 20, role, search } = req.query;

        const query = {};
        if (role) query.role = role;
        if (search) {
            query.$or = [
                { name: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') }
            ];
        }

        const users = await userModel
            .find(query)
            .select('-password -verifyOtp -resetOtp')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await userModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalUsers: count
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update user role (Admin only)
export const updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;

        if (!userId || !role) {
            return res.status(400).json({ success: false, message: 'User ID and role are required' });
        }

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role' });
        }

        const user = await userModel.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'User role updated successfully',
            user
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await userModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get user statistics (Admin only)
export const getUserStats = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        const verifiedUsers = await userModel.countDocuments({ isAccountVerified: true });
        const adminUsers = await userModel.countDocuments({ role: 'admin' });
        const regularUsers = await userModel.countDocuments({ role: 'user' });

        return res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                verifiedUsers,
                adminUsers,
                regularUsers,
                unverifiedUsers: totalUsers - verifiedUsers
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
