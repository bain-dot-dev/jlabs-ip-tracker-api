import jwt, { SignOptions } from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
}

/**
 * Generate JWT token for authenticated user
 * @param userId - User UUID
 * @param email - User email
 * @returns JWT token
 */
export const generateToken = (userId: string, email: string): string => {
  const payload: TokenPayload = { id: userId, email };
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  };

  return jwt.sign(payload, secret, options);
};

/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload
 */
export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
