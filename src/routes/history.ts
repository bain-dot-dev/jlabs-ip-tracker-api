import express from "express";
import {
  getHistory,
  getHistoryById,
  createHistory,
  deleteHistory,
} from "../controllers/historyController";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import {
  createHistorySchema,
  deleteHistorySchema,
  uuidSchema,
} from "../schemas/validation";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

/**
 * @route   GET /api/history
 * @desc    Get authenticated user's IP search history
 * @access  Private
 */
router.get("/", getHistory);

/**
 * @route   GET /api/history/:id
 * @desc    Get a single history entry by ID
 * @access  Private
 */
router.get("/:id", getHistoryById);

/**
 * @route   POST /api/history
 * @desc    Save IP search to user's history
 * @access  Private
 */
router.post("/", validate(createHistorySchema), createHistory);

/**
 * @route   DELETE /api/history
 * @desc    Delete multiple history entries by UUIDs
 * @access  Private
 */
router.delete("/", validate(deleteHistorySchema), deleteHistory);

export default router;
