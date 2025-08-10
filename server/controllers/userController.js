import userModel from '../models/userModel.js';


export const getUserData = async (req, res) => {


    try {
        const {userId} = req.body;
        // Validate input
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        // Return user data excluding sensitive information

        res.json({ 
            success: true, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified
            } 
        });

    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
