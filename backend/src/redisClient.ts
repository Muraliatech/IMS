import Redis from "ioredis";

const redisClient = new Redis({
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

export default redisClient;
