import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import historyRoutes from "./routes/history";
import { errorHandler, notFound } from "./middleware/errorHandler";
import prisma from "./utils/prisma";

// Initialize Express app
const app: Application = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api", authRoutes);
app.use("/api/history", historyRoutes);

// 404 handler for undefined routes
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Server configuration
const PORT = process.env.PORT || 8000;

// Start server
const server = app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);

  // Test database connection
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", (error as Error).message);
  }
});

// Graceful shutdown
const gracefulShutdown = async (): Promise<void> => {
  console.log("\n🔄 Shutting down gracefully...");

  server.close(async () => {
    console.log("🛑 HTTP server closed");

    try {
      await prisma.$disconnect();
      console.log("✅ Database connection closed");
      process.exit(0);
    } catch (error) {
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
process.on("unhandledRejection", (error: Error) => {
  console.error("❌ Unhandled Rejection:", error);
  gracefulShutdown();
});

export default app;
