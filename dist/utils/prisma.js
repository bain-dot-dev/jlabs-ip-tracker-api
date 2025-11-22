"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
// Create a connection pool for Supabase
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
// Create adapter
const adapter = new adapter_pg_1.PrismaPg(pool);
// Singleton instance of Prisma Client with adapter
const prisma = new client_1.PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
// Handle graceful shutdown
process.on("beforeExit", async () => {
    await prisma.$disconnect();
    await pool.end();
});
exports.default = prisma;
//# sourceMappingURL=prisma.js.map