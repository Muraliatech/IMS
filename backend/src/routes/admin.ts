// src/routes/admin.ts
import { Router } from "express";
import { checkAuth } from "../middleware/auth";
import {createUser,listUsers,updateUser,deleteUser,updateRole} from "../controllers/admin"
const router = Router();

router.post("/users", checkAuth(["ADMIN"]), createUser);
router.get("/users", checkAuth(["ADMIN"]), listUsers);
router.put("/users/:id", checkAuth(["ADMIN"]), updateUser);
router.delete("/users/:id", checkAuth(["ADMIN"]), deleteUser);
router.patch("/users/:id/role", checkAuth(["ADMIN"]), updateRole);

// router.post("/suppliers/approve", checkAuth(["ADMIN"]), approveSupplier);
// router.get("/suppliers", checkAuth(["ADMIN"]), listSuppliers);

// router.get("/reports/inventory", checkAuth(["ADMIN"]), inventoryReport);
// router.get("/reports/sales", checkAuth(["ADMIN"]), salesReport);

export default router;
