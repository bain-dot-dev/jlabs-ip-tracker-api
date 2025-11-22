import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

/**
 * Global error handling middleware
 * @param err - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error for debugging
  console.error("Error:", err);

  // Default error response
  let statusCode = 500;
  let message = "Internal server error";
  let errorType = "ServerError";

  // Handle Prisma-specific errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation (e.g., duplicate email)
    if (err.code === "P2002") {
      statusCode = 409;
      const target = err.meta?.target as string[] | undefined;
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
  else if (err instanceof Prisma.PrismaClientValidationError) {
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
    statusCode = (err as any).statusCode;
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

/**
 * Not found middleware for undefined routes
 * @param req - Express request object
 * @param res - Express response object
 */
export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};
