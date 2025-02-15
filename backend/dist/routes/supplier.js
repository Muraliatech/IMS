"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/manager.ts
const express_1 = require("express");
// Adjust the import path as necessary
const auth_1 = require("../middleware/auth");
const supplier_1 = require("../controllers/supplier");
const router = (0, express_1.Router)();
// router.get("/inventory", checkAuth("MANAGER"), listInventory);
// router.post("/inventory", checkAuth("MANAGER"), addInventory);
// router.put("/inventory/:id", checkAuth("MANAGER"), updateInventory);
// router.delete("/inventory/:id", checkAuth("MANAGER"), deleteInventory);
// router.get("/reorder", checkAuth("MANAGER"), viewLowStock);
// router.post("/reorder", checkAuth("MANAGER"), createReorder);
router.get("/retriveorder", (0, auth_1.checkAuth)(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]), supplier_1.retriveOrders);
// router.get("/getOrderProduct/:orderId",checkAuth(["MANUFACTURER","WHOLESALER","DISTRIBUTOR"]),getProductById)
router.patch("/proposePriceForOrder/:orderId", (0, auth_1.checkAuth)(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]), supplier_1.proposePriceForOrder);
router.patch("/updateProductionStatus/:orderId", (0, auth_1.checkAuth)(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]), supplier_1.updateProductionStatus);
router.patch("/initiate-QC/:orderId", (0, auth_1.checkAuth)(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]), supplier_1.initiateQualityCheck);
router.patch("/delivery/:orderId", (0, auth_1.checkAuth)(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]), supplier_1.updateShippingStatus);
exports.default = router;
