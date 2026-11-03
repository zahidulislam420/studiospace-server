import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      ENV.CLIENT_URL,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Health Check
app.get("/", (_req, res) => {
  res.json({
    name: "StudioSpace Server API",
    version: "1.0.0",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "healthy", uptime: process.uptime() });
});

// Global Error Handler
app.use(errorHandler);

// Bootstrap
if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => {
      app.listen(ENV.PORT, () => {
        console.log(`StudioSpace API server listening on http://localhost:${ENV.PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to connect to database on startup:", err);
    });
}

export default app;
