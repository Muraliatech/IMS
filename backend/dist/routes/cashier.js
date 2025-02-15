"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/cashier.ts
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const SyncInventoryandProduct_1 = __importDefault(require("../middleware/SyncInventoryandProduct"));
const cashier_1 = require("../controllers/cashier");
const router = (0, express_1.Router)();
router.get("/products", (0, auth_1.checkAuth)(["CASHIER"]), cashier_1.products);
router.post("/order", (0, auth_1.checkAuth)(["CASHIER"]), cashier_1.order);
router.post("/generatereceipt", SyncInventoryandProduct_1.default, (0, auth_1.checkAuth)(["CASHIER"]), cashier_1.generateReceipt);
router.get("/transaction", (0, auth_1.checkAuth)(["CASHIER"]), cashier_1.transaction);
router.get("/product-availability/:productId", (0, auth_1.checkAuth)(["CASHIER"]), cashier_1.productAvilability);
router.post("/cancelorder", (0, auth_1.checkAuth)(["CASHIER"]), cashier_1.cancelOrder);
exports.default = router;
