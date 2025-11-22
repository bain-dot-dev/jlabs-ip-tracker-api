import { z } from "zod";
export declare const geolocationDataSchema: z.ZodObject<{
    ip: z.ZodString;
    hostname: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    region: z.ZodString;
    country: z.ZodString;
    loc: z.ZodString;
    org: z.ZodString;
    postal: z.ZodOptional<z.ZodString>;
    timezone: z.ZodString;
    asn: z.ZodOptional<z.ZodString>;
    as_name: z.ZodOptional<z.ZodString>;
    as_domain: z.ZodOptional<z.ZodString>;
    country_code: z.ZodOptional<z.ZodString>;
    continent_code: z.ZodOptional<z.ZodString>;
    continent: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    ip: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    timezone: string;
    hostname?: string | undefined;
    postal?: string | undefined;
    asn?: string | undefined;
    as_name?: string | undefined;
    as_domain?: string | undefined;
    country_code?: string | undefined;
    continent_code?: string | undefined;
    continent?: string | undefined;
}, {
    ip: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    timezone: string;
    hostname?: string | undefined;
    postal?: string | undefined;
    asn?: string | undefined;
    as_name?: string | undefined;
    as_domain?: string | undefined;
    country_code?: string | undefined;
    continent_code?: string | undefined;
    continent?: string | undefined;
}>;
export declare const uuidSchema: z.ZodString;
export declare const uuidArraySchema: z.ZodArray<z.ZodString, "many">;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createHistorySchema: z.ZodObject<{
    ip_address: z.ZodString;
    geo_data: z.ZodObject<{
        ip: z.ZodString;
        hostname: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        region: z.ZodString;
        country: z.ZodString;
        loc: z.ZodString;
        org: z.ZodString;
        postal: z.ZodOptional<z.ZodString>;
        timezone: z.ZodString;
        asn: z.ZodOptional<z.ZodString>;
        as_name: z.ZodOptional<z.ZodString>;
        as_domain: z.ZodOptional<z.ZodString>;
        country_code: z.ZodOptional<z.ZodString>;
        continent_code: z.ZodOptional<z.ZodString>;
        continent: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ip: string;
        city: string;
        region: string;
        country: string;
        loc: string;
        org: string;
        timezone: string;
        hostname?: string | undefined;
        postal?: string | undefined;
        asn?: string | undefined;
        as_name?: string | undefined;
        as_domain?: string | undefined;
        country_code?: string | undefined;
        continent_code?: string | undefined;
        continent?: string | undefined;
    }, {
        ip: string;
        city: string;
        region: string;
        country: string;
        loc: string;
        org: string;
        timezone: string;
        hostname?: string | undefined;
        postal?: string | undefined;
        asn?: string | undefined;
        as_name?: string | undefined;
        as_domain?: string | undefined;
        country_code?: string | undefined;
        continent_code?: string | undefined;
        continent?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    ip_address: string;
    geo_data: {
        ip: string;
        city: string;
        region: string;
        country: string;
        loc: string;
        org: string;
        timezone: string;
        hostname?: string | undefined;
        postal?: string | undefined;
        asn?: string | undefined;
        as_name?: string | undefined;
        as_domain?: string | undefined;
        country_code?: string | undefined;
        continent_code?: string | undefined;
        continent?: string | undefined;
    };
}, {
    ip_address: string;
    geo_data: {
        ip: string;
        city: string;
        region: string;
        country: string;
        loc: string;
        org: string;
        timezone: string;
        hostname?: string | undefined;
        postal?: string | undefined;
        asn?: string | undefined;
        as_name?: string | undefined;
        as_domain?: string | undefined;
        country_code?: string | undefined;
        continent_code?: string | undefined;
        continent?: string | undefined;
    };
}>;
export declare const deleteHistorySchema: z.ZodObject<{
    ids: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    ids: string[];
}, {
    ids: string[];
}>;
export type GeolocationData = z.infer<typeof geolocationDataSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateHistoryInput = z.infer<typeof createHistorySchema>;
export type DeleteHistoryInput = z.infer<typeof deleteHistorySchema>;
//# sourceMappingURL=validation.d.ts.map