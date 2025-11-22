import { z } from "zod";

// Geolocation data schema (from ipinfo.io)
export const geolocationDataSchema = z.object({
  ip: z.string(),
  hostname: z.string().optional(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  loc: z.string(), // "lat,lng"
  org: z.string(),
  postal: z.string().optional(),
  timezone: z.string(),
  asn: z.string().optional(),
  as_name: z.string().optional(),
  as_domain: z.string().optional(),
  country_code: z.string().optional(),
  continent_code: z.string().optional(),
  continent: z.string().optional(),
});

// UUID validation
export const uuidSchema = z.string().uuid();

// Array of UUIDs for bulk delete
export const uuidArraySchema = z.array(z.string().uuid());

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Register schema
export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Create history schema
export const createHistorySchema = z.object({
  ip_address: z.string().ip("Invalid IP address"),
  geo_data: geolocationDataSchema,
});

// Delete history schema
export const deleteHistorySchema = z.object({
  ids: uuidArraySchema.min(1, "At least one ID is required"),
});

// TypeScript types derived from schemas
export type GeolocationData = z.infer<typeof geolocationDataSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateHistoryInput = z.infer<typeof createHistorySchema>;
export type DeleteHistoryInput = z.infer<typeof deleteHistorySchema>;
