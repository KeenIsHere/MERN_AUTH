import express from 'express';
import {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
    searchPackages,
    getFeaturedPackages
} from '../controllers/packageController.js';
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const packageRouter = express.Router();

// Public routes
packageRouter.get('/all', getAllPackages);
packageRouter.get('/search', searchPackages);
packageRouter.get('/featured', getFeaturedPackages);
packageRouter.get('/:id', getPackageById);

// Admin routes
packageRouter.post('/create', adminAuth, createPackage);
packageRouter.put('/update/:id', adminAuth, updatePackage);
packageRouter.delete('/delete/:id', adminAuth, deletePackage);

export default packageRouter;
