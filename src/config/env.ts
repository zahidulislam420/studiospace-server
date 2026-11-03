import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  DBUSER: process.env.DBUSER || "",
  DBPASSWORD: process.env.DBPASSWORD || "",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/studiospace",
  JWT_SECRET:
    process.env.JWT_SECRET || "studiospace_shared_jwt_secret_development_min32chars",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV || "development",
};
