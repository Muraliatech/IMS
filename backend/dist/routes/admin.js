"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/admin.ts
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const admin_1 = require("../controllers/admin");
const router = (0, express_1.Router)();
router.post("/users", (0, auth_1.checkAuth)(["ADMIN"]), admin_1.createUser);
router.get("/users", (0, auth_1.checkAuth)(["ADMIN"]), admin_1.listUsers);
router.put("/users/:id", (0, auth_1.checkAuth)(["ADMIN"]), admin_1.updateUser);
router.delete("/users/:id", (0, auth_1.checkAuth)(["ADMIN"]), admin_1.deleteUser);
router.patch("/users/:id/role", (0, auth_1.checkAuth)(["ADMIN"]), admin_1.updateRole);
// router.post("/suppliers/approve", checkAuth(["ADMIN"]), approveSupplier);
// router.get("/suppliers", checkAuth(["ADMIN"]), listSuppliers);
// router.get("/reports/inventory", checkAuth(["ADMIN"]), inventoryReport);
// router.get("/reports/sales", checkAuth(["ADMIN"]), salesReport);
exports.default = router;
