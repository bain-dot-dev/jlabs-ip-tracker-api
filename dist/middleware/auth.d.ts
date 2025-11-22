import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
            };
        }
    }
}
/**
 * Authentication middleware to verify JWT token
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map