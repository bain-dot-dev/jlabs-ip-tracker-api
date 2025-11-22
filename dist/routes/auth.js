"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middleware/validate");
const validation_1 = require("../schemas/validation");
const router = express_1.default.Router();
/**
 * @route   POST /api/login
 * @desc    Login user and return JWT token
 * @access  Public
 */
router.post("/login", (0, validate_1.validate)(validation_1.loginSchema), authController_1.login);
/**
 * @route   POST /api/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", (0, validate_1.validate)(validation_1.registerSchema), authController_1.register);
exports.default = router;
//# sourceMappingURL=auth.js.map