"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const historyController_1 = require("../controllers/historyController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const validation_1 = require("../schemas/validation");
const router = express_1.default.Router();
// Apply authentication middleware to all routes
router.use(auth_1.authenticate);
/**
 * @route   GET /api/history
 * @desc    Get authenticated user's IP search history
 * @access  Private
 */
router.get("/", historyController_1.getHistory);
/**
 * @route   GET /api/history/:id
 * @desc    Get a single history entry by ID
 * @access  Private
 */
router.get("/:id", historyController_1.getHistoryById);
/**
 * @route   POST /api/history
 * @desc    Save IP search to user's history
 * @access  Private
 */
router.post("/", (0, validate_1.validate)(validation_1.createHistorySchema), historyController_1.createHistory);
/**
 * @route   DELETE /api/history
 * @desc    Delete multiple history entries by UUIDs
 * @access  Private
 */
router.delete("/", (0, validate_1.validate)(validation_1.deleteHistorySchema), historyController_1.deleteHistory);
exports.default = router;
//# sourceMappingURL=history.js.map