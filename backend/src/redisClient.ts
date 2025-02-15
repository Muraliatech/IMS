import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.PORT ? parseInt(process.env.PORT) : undefined,  
  password:process.env.REDIS_PASS,  
  tls: {}  
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
  } else {
    console.log("Result:", result);
  }
});

export default redisClient;
