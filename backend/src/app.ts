// app.ts
import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";

// Import Routes
import adminRoutes from "./routes/admin";
import managerRoutes from "./routes/manager";
import salesRoutes from "./routes/sales";
import supplierRoutes from "./routes/supplier";
import customerRoutes from "./routes/customer";
import cashierRoutes from "./routes/cashier";
import authRoutes from "./routes/authRoutes";

 
 
// Initialize environment variables
dotenv.config();
 
// Create Express app
const app = express();




// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'https://inventorysolutions.vercel.app',  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,  
  })
);
app.use(morgan("dev"));
app.use(helmet());

// Base API Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the Inventory Management System API!" });
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/cashier", cashierRoutes);
app.use("/api/auth", authRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running" });
});

app.post("/api/payment-sucess",(req:Request,res:Response)=>{
      const responseBody = req.body;
      console.log(responseBody)
     
      res.status(200).json({"Messagr:":responseBody})
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});





export default app;
