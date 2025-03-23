"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ioredis_1 = __importDefault(require("ioredis"));
console.log(process.env.REDIS_HOST);
console.log(process.env.REDIS_PORT);
console.log(process.env.REDIS_PASS);
// Redis client configuration using environment variables
const redisClient = new ioredis_1.default({
    host: process.env.REDIS_HOST, // Redis host from environment variables
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined, // Redis port from environment variables
    password: process.env.REDIS_PASS, // Redis password from environment variables
    retryStrategy: (times) => {
        return times < 3 ? Math.min(times * 50, 2000) : null;
    },
    maxRetriesPerRequest: 3,
});
redisClient.on('connect', () => {
    console.log('✅ Connected to Redis successfully!');
});
exports.default = redisClient;
