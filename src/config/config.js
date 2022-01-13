import dotenv from "dotenv";
dotenv.config();

/* Environment variable Config */
module.exports = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  DB_NAME: process.env.DB_NAME || "poc_test",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "root",
  ENABLE_EUREKA_SERVICE_REGISTRY:
    process.env.ENABLE_EUREKA_SERVICE_REGISTRY || false,
  ENABLE_POC: process.env.ENABLE_POC || true,
  ENABLE_APP: process.env.ENABLE_APP || false,
};
