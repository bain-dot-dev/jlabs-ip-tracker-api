"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const history_1 = __importDefault(require("./routes/history"));
const errorHandler_1 = require("./middleware/errorHandler");
const prisma_1 = __importDefault(require("./utils/prisma"));
// Initialize Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)(process.env.NODE_ENV === "development" ? "dev" : "combined"));
// Health check endpoint
app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});
// API routes
app.use("/api", auth_1.default);
app.use("/api/history", history_1.default);
// 404 handler for undefined routes
app.use(errorHandler_1.notFound);
// Global error handler
app.use(errorHandler_1.errorHandler);
// Server configuration
const PORT = process.env.PORT || 8000;
// Start server
const server = app.listen(PORT, async () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
    // Test database connection
    try {
        await prisma_1.default.$connect();
        console.log("✅ Database connected successfully");
    }
    catch (error) {
        console.error("❌ Database connection failed:", error.message);
    }
});
// Graceful shutdown
const gracefulShutdown = async () => {
    console.log("\n🔄 Shutting down gracefully...");
    server.close(async () => {
        console.log("🛑 HTTP server closed");
        try {
            await prisma_1.default.$disconnect();
            console.log("✅ Database connection closed");
            process.exit(0);
        }
        catch (error) {
            console.error("❌ Error during shutdown:", error);
            process.exit(1);
        }
    });
    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error("⚠️ Forcing shutdown");
        process.exit(1);
    }, 10000);
};
// Handle termination signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
    console.error("❌ Unhandled Rejection:", error);
    gracefulShutdown();
});
exports.default = app;
//# sourceMappingURL=server.js.map