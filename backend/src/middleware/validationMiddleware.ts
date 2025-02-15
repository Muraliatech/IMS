// src/routes/manager.ts
import { Router } from "express";
import { checkAuth } from "../middleware/auth";
const router = Router();

// router.get("/inventory", checkAuth("MANAGER"), listInventory);
// router.post("/inventory", checkAuth("MANAGER"), addInventory);
// router.put("/inventory/:id", checkAuth("MANAGER"), updateInventory);
// router.delete("/inventory/:id", checkAuth("MANAGER"), deleteInventory);

// router.get("/reorder", checkAuth("MANAGER"), viewLowStock);
// router.post("/reorder", checkAuth("MANAGER"), createReorder);



export default router;
