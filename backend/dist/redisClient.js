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
const redisClient = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
    password: process.env.REDIS_PASS,
    retryStrategy: (times) => {
        return times < 3 ? Math.min(times * 50, 2000) : null;
    },
    maxRetriesPerRequest: 3,
});
redisClient.on('connect', () => {
    console.log('✅ Connected to Redis successfully!');
});
exports.default = redisClient;
