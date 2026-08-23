import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    // This line logs the cookie object received by the server
    console.log("Cookies received by server:", req.cookies);

    const token = req.cookies.token || req.headers['authorization']?.replace("Bearer ","");
    
    if(!token){
        // Return a 401 Unauthorized error if no token is found.
        return next(new errorHandler("Please authenticate", 401));
    }
    
    try {
        
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenData;
        next();
    } catch (error) {
        // If verification fails, return a 401 Unauthorized error.
        return next(new errorHandler("Invalid or expired token", 401));
    }
});