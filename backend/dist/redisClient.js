"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const redisClient = new ioredis_1.default({
    host: "127.0.0.1",
    port: 6379,
});
redisClient.on("connect", () => {
    console.log("Connected to Redis");
});
redisClient.on("error", (err) => {
    console.error("Redis error: ", err);
});
redisClient.set("test", "Hello Redis", (err, result) => {
    if (err) {
        console.log("Error:", err);
    }
    else {
        console.log("Result:", result);
    }
});
exports.default = redisClient;
