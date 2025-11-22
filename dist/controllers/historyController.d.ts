import { Request, Response, NextFunction } from "express";
/**
 * Get authenticated user's IP search history
 * @route GET /api/history
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export declare const getHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Save IP search to user's history
 * @route POST /api/history
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export declare const createHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get a single history entry by ID
 * @route GET /api/history/:id
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export declare const getHistoryById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete multiple history entries by UUIDs
 * @route DELETE /api/history
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export declare const deleteHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=historyController.d.ts.map