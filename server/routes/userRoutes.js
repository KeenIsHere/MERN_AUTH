import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';


const userRouter = express.Router();
// Define routes for user operations

userRouter.get('/data', userAuth, getUserData); // Get user data

export default userRouter;
// Add more user-related routes as needed