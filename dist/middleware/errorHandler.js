"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
/**
 * Global error handling middleware
 * @param err - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
    // Log error for debugging
    console.error("Error:", err);
    // Default error response
    let statusCode = 500;
    let message = "Internal server error";
    let errorType = "ServerError";
    // Handle Prisma-specific errors
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        // Unique constraint violation (e.g., duplicate email)
        if (err.code === "P2002") {
            statusCode = 409;
            const target = err.meta?.target;
            message = `A record with this ${target?.[0] || "field"} already exists`;
            errorType = "DuplicateError";
        }
        // Record not found
        else if (err.code === "P2025") {
            statusCode = 404;
            message = "Record not found";
            errorType = "NotFoundError";
        }
        // Foreign key constraint violation
        else if (err.code === "P2003") {
            statusCode = 400;
            message = "Invalid reference to related record";
            errorType = "ForeignKeyError";
        }
    }
    // Handle Prisma validation errors
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid data provided";
        errorType = "ValidationError";
    }
    // Handle JWT errors
    else if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
        errorType = "AuthenticationError";
    }
    // Handle JWT expiration
    else if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token has expired";
        errorType = "TokenExpiredError";
    }
    // Handle custom errors with statusCode
    else if ("statusCode" in err) {
        statusCode = err.statusCode;
        message = err.message;
        errorType = err.name || "CustomError";
    }
    // Handle other known errors
    else if (err.message) {
        message = err.message;
    }
    // Send error response
    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
/**
 * Not found middleware for undefined routes
 * @param req - Express request object
 * @param res - Express response object
 */
const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
};
exports.notFound = notFound;
//# sourceMappingURL=errorHandler.js.map