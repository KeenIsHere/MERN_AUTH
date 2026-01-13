import packageModel from '../models/packageModel.js';

// Create a new package (Admin only)
export const createPackage = async (req, res) => {
    try {
        const { title, description, destination, price, duration, maxCapacity, images, inclusions, exclusions, itinerary, category, difficulty, startDates } = req.body;

        if (!title || !description || !destination || !price || !duration) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const newPackage = new packageModel({
            title,
            description,
            destination,
            price,
            duration,
            maxCapacity,
            images,
            inclusions,
            exclusions,
            itinerary,
            category,
            difficulty,
            startDates,
            createdBy: req.body.userId
        });

        await newPackage.save();

        return res.status(201).json({
            success: true,
            message: 'Package created successfully',
            package: newPackage
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all packages (with pagination and filters)
export const getAllPackages = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, minPrice, maxPrice, destination, availability, sort = '-createdAt' } = req.query;

        const query = { status: 'active' };

        if (category) query.category = category;
        if (destination) query.destination = new RegExp(destination, 'i');
        if (availability !== undefined) query.availability = availability === 'true';
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const packages = await packageModel
            .find(query)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('createdBy', 'name email')
            .exec();

        const count = await packageModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            packages,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalPackages: count
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get single package by ID
export const getPackageById = async (req, res) => {
    try {
        const { id } = req.params;

        const package_ = await packageModel
            .findById(id)
            .populate('createdBy', 'name email');

        if (!package_) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        return res.status(200).json({
            success: true,
            package: package_
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update package (Admin only)
export const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Remove fields that shouldn't be updated
        delete updateData.userId;
        delete updateData.createdBy;

        const package_ = await packageModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!package_) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Package updated successfully',
            package: package_
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete package (Admin only - soft delete by changing status)
export const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;

        const package_ = await packageModel.findByIdAndUpdate(
            id,
            { status: 'archived' },
            { new: true }
        );

        if (!package_) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Package deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Search packages
export const searchPackages = async (req, res) => {
    try {
        const { keyword, page = 1, limit = 10 } = req.query;

        if (!keyword) {
            return res.status(400).json({ success: false, message: 'Search keyword is required' });
        }

        const packages = await packageModel
            .find({
                $text: { $search: keyword },
                status: 'active'
            })
            .sort({ score: { $meta: 'textScore' } })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('createdBy', 'name email')
            .exec();

        const count = await packageModel.countDocuments({
            $text: { $search: keyword },
            status: 'active'
        });

        return res.status(200).json({
            success: true,
            packages,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalResults: count
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get featured packages (top rated)
export const getFeaturedPackages = async (req, res) => {
    try {
        const { limit = 6 } = req.query;

        const packages = await packageModel
            .find({ status: 'active', availability: true })
            .sort({ rating: -1, totalReviews: -1 })
            .limit(Number(limit))
            .populate('createdBy', 'name');

        return res.status(200).json({
            success: true,
            packages
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
