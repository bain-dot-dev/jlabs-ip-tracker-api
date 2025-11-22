import { Request, Response, NextFunction } from "express";
/**
 * Login user and return JWT token
 * @route POST /api/login
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Register new user
 * @route POST /api/register
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export declare const register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authController.d.ts.map