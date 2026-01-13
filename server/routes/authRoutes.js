import express from 'express';
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword, registerAdmin } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';


const authRouter = express.Router();


// Define routes for authentication
authRouter.post('/register', register );
authRouter.post('/register-admin', registerAdmin);
authRouter.post('/login', login);
authRouter.post('/logout', logout); 
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp); 
authRouter.post('/verify-account', userAuth, verifyEmail); 
authRouter.post('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);



export default authRouter;