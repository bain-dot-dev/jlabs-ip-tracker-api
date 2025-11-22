"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Generate JWT token for authenticated user
 * @param userId - User UUID
 * @param email - User email
 * @returns JWT token
 */
const generateToken = (userId, email) => {
    const payload = { id: userId, email };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.generateToken = generateToken;
/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload
 */
const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw new Error("Invalid or expired token");
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map