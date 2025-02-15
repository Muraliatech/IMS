import Redis from "ioredis";

const redisClient = new Redis({
  host: "127.0.0.1", 
  port: 6379,         //6381
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
