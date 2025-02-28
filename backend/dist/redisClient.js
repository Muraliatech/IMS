"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const redisClient = new ioredis_1.default({
    host: "127.0.0.1", // Since Redis is running locally in Docker
    port: 6382, // Update to match your Docker port
    retryStrategy: (times) => Math.min(times * 50, 2000), // Retry logic
});
redisClient.on("connect", () => {
    console.log("✅ Connected to Redis successfully!");
});
redisClient.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
});
exports.default = redisClient;
