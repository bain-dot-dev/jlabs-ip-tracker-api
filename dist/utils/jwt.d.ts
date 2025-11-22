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
export declare const generateToken: (userId: string, email: string) => string;
/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload
 */
export declare const verifyToken: (token: string) => TokenPayload;
export {};
//# sourceMappingURL=jwt.d.ts.map