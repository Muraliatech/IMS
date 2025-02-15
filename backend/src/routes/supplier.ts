// src/routes/manager.ts
import { Router } from "express";
  // Adjust the import path as necessary
import { checkAuth } from "../middleware/auth";
import { proposePriceForOrder,updateProductionStatus,initiateQualityCheck,retriveOrders,updateShippingStatus } from "../controllers/supplier";
 
const router = Router();

// router.get("/inventory", checkAuth("MANAGER"), listInventory);
// router.post("/inventory", checkAuth("MANAGER"), addInventory);
// router.put("/inventory/:id", checkAuth("MANAGER"), updateInventory);
// router.delete("/inventory/:id", checkAuth("MANAGER"), deleteInventory);

// router.get("/reorder", checkAuth("MANAGER"), viewLowStock);
// router.post("/reorder", checkAuth("MANAGER"), createReorder);
router.get("/retriveorder",checkAuth(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]),retriveOrders)
// router.get("/getOrderProduct/:orderId",checkAuth(["MANUFACTURER","WHOLESALER","DISTRIBUTOR"]),getProductById)

router.patch("/proposePriceForOrder/:orderId",checkAuth(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]),proposePriceForOrder);
router.patch("/updateProductionStatus/:orderId",checkAuth(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]),updateProductionStatus);
router.patch("/initiate-QC/:orderId",checkAuth(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]),initiateQualityCheck);
router.patch("/delivery/:orderId",checkAuth(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]),updateShippingStatus);
export default router;
