"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHistory = exports.getHistoryById = exports.createHistory = exports.getHistory = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
/**
 * Get authenticated user's IP search history
 * @route GET /api/history
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
const getHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // Fetch user's search history, sorted by most recent first
        const history = await prisma_1.default.searchHistory.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                searchedAt: "desc",
            },
            select: {
                id: true,
                ipAddress: true,
                geoData: true,
                searchedAt: true,
            },
        });
        res.status(200).json({
            success: true,
            data: history,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getHistory = getHistory;
/**
 * Save IP search to user's history
 * @route POST /api/history
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
const createHistory = async (req, res, next) => {
    try {
        const { ip_address, geo_data } = req.body;
        const userId = req.user.id;
        // Create new search history entry
        const historyEntry = await prisma_1.default.searchHistory.create({
            data: {
                userId: userId,
                ipAddress: ip_address,
                geoData: geo_data,
            },
        });
        res.status(201).json({
            success: true,
            data: {
                id: historyEntry.id,
                ipAddress: historyEntry.ipAddress,
                geoData: historyEntry.geoData,
                searchedAt: historyEntry.searchedAt,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createHistory = createHistory;
/**
 * Get a single history entry by ID
 * @route GET /api/history/:id
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
const getHistoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        // Fetch the specific history entry
        const historyEntry = await prisma_1.default.searchHistory.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                ipAddress: true,
                geoData: true,
                searchedAt: true,
                userId: true,
            },
        });
        // Check if the entry exists
        if (!historyEntry) {
            res.status(404).json({
                success: false,
                message: "History entry not found",
            });
            return;
        }
        // Verify ownership
        if (historyEntry.userId !== userId) {
            res.status(403).json({
                success: false,
                message: "You do not have permission to access this history entry",
            });
            return;
        }
        // Remove userId from response for security
        const { userId: _, ...responseData } = historyEntry;
        res.status(200).json({
            success: true,
            data: responseData,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getHistoryById = getHistoryById;
/**
 * Delete multiple history entries by UUIDs
 * @route DELETE /api/history
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
const deleteHistory = async (req, res, next) => {
    try {
        const { ids } = req.body;
        const userId = req.user.id;
        // First, verify that all entries belong to the authenticated user
        const entriesToDelete = await prisma_1.default.searchHistory.findMany({
            where: {
                id: { in: ids },
            },
            select: {
                id: true,
                userId: true,
            },
        });
        // Check if any entries don't belong to the user
        const unauthorizedEntries = entriesToDelete.filter((entry) => entry.userId !== userId);
        if (unauthorizedEntries.length > 0) {
            res.status(403).json({
                success: false,
                message: "You do not have permission to delete these entries",
            });
            return;
        }
        // Check if all IDs were found
        if (entriesToDelete.length !== ids.length) {
            res.status(404).json({
                success: false,
                message: "Some history entries were not found",
            });
            return;
        }
        // Delete the entries
        const result = await prisma_1.default.searchHistory.deleteMany({
            where: {
                id: { in: ids },
                userId: userId, // Extra safety check
            },
        });
        res.status(200).json({
            success: true,
            message: `Successfully deleted ${result.count} history ${result.count === 1 ? 'entry' : 'entries'}`,
            deletedCount: result.count,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteHistory = deleteHistory;
//# sourceMappingURL=historyController.js.map