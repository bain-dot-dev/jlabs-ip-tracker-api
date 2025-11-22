"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
/**
 * Authentication middleware to verify JWT token
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
const authenticate = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "No token provided or invalid token format",
            });
            return;
        }
        // Extract token (remove 'Bearer ' prefix)
        const token = authHeader.substring(7);
        // Verify token
        const decoded = (0, jwt_1.verifyToken)(token);
        // Attach user information to request object
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : "Invalid or expired token",
        });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map