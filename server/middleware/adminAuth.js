import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const adminAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized. Admin access required' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if (tokenDecode.id) {
            // Fetch user and check if admin
            const user = await userModel.findById(tokenDecode.id);
            
            if (!user) {
                return res.status(401).json({ success: false, message: 'User not found' });
            }

            if (user.role !== 'admin') {
                return res.status(403).json({ success: false, message: 'Access denied. Admin privileges required' });
            }

            req.body.userId = tokenDecode.id;
            req.body.userRole = user.role;
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Unauthorized. Invalid token' });
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default adminAuth;
