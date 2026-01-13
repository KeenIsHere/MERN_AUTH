import express from 'express';
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';
import { getUserData } from '../controllers/userController.js';
import { getAllUsers, updateUserRole, deleteUser, getUserStats } from '../controllers/adminController.js';


const userRouter = express.Router();
// Define routes for user operations

userRouter.get('/data', userAuth, getUserData); // Get user data

// Admin routes for user management
userRouter.get('/admin/all-users', adminAuth, getAllUsers);
userRouter.put('/admin/update-role', adminAuth, updateUserRole);
userRouter.delete('/admin/delete/:userId', adminAuth, deleteUser);
userRouter.get('/admin/stats', adminAuth, getUserStats);

export default userRouter;
// Add more user-related routes as needed