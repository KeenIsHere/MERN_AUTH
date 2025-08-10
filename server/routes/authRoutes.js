import express from 'express';
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';


const authRouter = express.Router();
// Define routes for authentication
authRouter.post('/register', register );
authRouter.post('/login', login);
authRouter.post('/logout', logout); 
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp); 
authRouter.post('/verify-account', userAuth, verifyEmail); 
authRouter.post('/is-auth', userAuth, isAuthenticated);

export default authRouter;