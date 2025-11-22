"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHistorySchema = exports.createHistorySchema = exports.registerSchema = exports.loginSchema = exports.uuidArraySchema = exports.uuidSchema = exports.geolocationDataSchema = void 0;
const zod_1 = require("zod");
// Geolocation data schema (from ipinfo.io)
exports.geolocationDataSchema = zod_1.z.object({
    ip: zod_1.z.string(),
    hostname: zod_1.z.string().optional(),
    city: zod_1.z.string(),
    region: zod_1.z.string(),
    country: zod_1.z.string(),
    loc: zod_1.z.string(), // "lat,lng"
    org: zod_1.z.string(),
    postal: zod_1.z.string().optional(),
    timezone: zod_1.z.string(),
    asn: zod_1.z.string().optional(),
    as_name: zod_1.z.string().optional(),
    as_domain: zod_1.z.string().optional(),
    country_code: zod_1.z.string().optional(),
    continent_code: zod_1.z.string().optional(),
    continent: zod_1.z.string().optional(),
});
// UUID validation
exports.uuidSchema = zod_1.z.string().uuid();
// Array of UUIDs for bulk delete
exports.uuidArraySchema = zod_1.z.array(zod_1.z.string().uuid());
// Login schema
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
// Register schema
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
// Create history schema
exports.createHistorySchema = zod_1.z.object({
    ip_address: zod_1.z.string().ip("Invalid IP address"),
    geo_data: exports.geolocationDataSchema,
});
// Delete history schema
exports.deleteHistorySchema = zod_1.z.object({
    ids: exports.uuidArraySchema.min(1, "At least one ID is required"),
});
//# sourceMappingURL=validation.js.map