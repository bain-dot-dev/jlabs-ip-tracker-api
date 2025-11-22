"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const jwt_1 = require("../utils/jwt");
const password_1 = require("../utils/password");
/**
 * Login user and return JWT token
 * @route POST /api/login
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        // Check if user exists
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
            return;
        }
        // Verify password
        const isPasswordValid = await (0, password_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
            return;
        }
        // Generate JWT token
        const token = (0, jwt_1.generateToken)(user.id, user.email);
        // Return success response with token and user info
        res.status(200).json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
/**
 * Register new user
 * @route POST /api/register
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check if user already exists
        const existingUser = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "User with this email already exists",
            });
            return;
        }
        // Hash password with 10 salt rounds
        const hashedPassword = await (0, password_1.hashPassword)(password);
        // Create new user
        const user = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        // Generate JWT token
        const token = (0, jwt_1.generateToken)(user.id, user.email);
        // Return success response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
//# sourceMappingURL=authController.js.map