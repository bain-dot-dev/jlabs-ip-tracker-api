import express from "express";
import { login, register } from "../controllers/authController";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../schemas/validation";

const router = express.Router();

/**
 * @route   POST /api/login
 * @desc    Login user and return JWT token
 * @access  Public
 */
router.post("/login", validate(loginSchema), login);

/**
 * @route   POST /api/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", validate(registerSchema), register);

export default router;
