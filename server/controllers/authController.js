import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

export const register = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' })
    }

    try {

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res
            .status(400)
            .json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bycrypt.hash(password, 10); 

        const user = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        //Sending a welcome email 
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Registration Successful',
            text: `Welcome ${email}, your account has been created successfully!`
        }; 

        await transporter.sendMail(mailOptions);
        // Sending a welcome email

        return res.json({ success: true, message: 'Registration successful' });


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res
        .status(400)
        .json({ success: false, message: 'Email And Password Are Requires' })
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Invalid Email' });
        }

        const isMatch = await bycrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.json({ success: true, message: 'Login successful' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });

        return res.json({ success: true, message: 'Logged Out successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}


// This function sends an OTP to the user's email for account verification
export const sendVerifyOtp = async (req,res) => {
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({Success: false, message: "Account Already Verirified"});
        }
        // Check if user exists
        const otp = String (Math.floor (100000 + Math.random() * 900000)); 
        // Generate a 6-digit OTP

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hr

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verify Your Account',
            text: `Your OTP for account verification is ${otp}`
        };
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'OTP sent to your email' });
        
    } catch (error) {
        res.json({ success: false, message: error.message});
    }
}
// This function sends an OTP to the user's email for account verification    
export const verifyEmail = async (req, res) => {
    // Extract userId and OTP from request body
    const { userId, otp } = req.body;
    // Validate input
    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing Details' });
    }
    try {
        const user = await userModel.findById(userId);
        // Check if user exists
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        // Check if the account is already verified
        if (user.isAccountVerified) {
            return res.json({ success: false, message: 'Account already verified' });
        }
        // Check if OTP is correct
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid or expired OTP' });
        }
        // Check if OTP has expired
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP has expired' });
        }       
        // If OTP is valid, verify the account

        // Update user account status
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Account verified successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// This function checks if the user is authenticated by verifying the JWT token
export const isAuthenticated = async (req, res) => {
    
    try {
        return res.json({ success: true, message: 'User is authenticated' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// send password reset OTP to user's email
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }
    try{
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000)); // Generate a 6-digit OTP
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}`
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'OTP sent to your email' }); 
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
} 

// reset user password using OTP
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Missing Details' });
    }
    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid or expired OTP' });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP has expired' });
        }
        // If OTP is valid, reset the password

        const hashedPassword = await bycrypt.hash(newPassword, 10);
        
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();
        // Sending a confirmation email
        return res.json({ success: true, message: 'Password reset successful' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}