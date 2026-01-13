import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {

    const {token} = req.cookies; // Extract token from cookies

    // Check if token exists
    if (!token) {
        return res.json({ success: false, message: 'Unauthorized, Try Again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id// Attach user ID to request object
        } else {
            return res.json({ success: false, message: 'Unauthorized, Try Again' });
        }

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}
export default userAuth;

