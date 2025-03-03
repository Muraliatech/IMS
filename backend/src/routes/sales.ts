// src/routes/manager.ts
import { Router } from "express";
import { checkAuth } from "../middleware/auth";
const router = Router();
 import {getSalesOverview,getSalesByRegion,getTopProducts,getOrders ,getOrderById,getSalesByCustomer,getPaymentMethods,updateOrder,deleteOrder, createOrder} from "../controllers/sales"
import { lowstock } from "../controllers/manager";

 router.get("/overview",checkAuth(["SALES"]),getSalesOverview)
 router.get("/top-products",checkAuth(["SALES"]),getTopProducts)
 router.get("/orders",checkAuth(["SALES"]),getOrders)
 router.patch("/order/:id",checkAuth(["SALES"]),getOrderById)
 router.get("/salesbycustomer",checkAuth(["SALES"]),getSalesByCustomer)
 router.get("/PaymentMethods",checkAuth(["SALES"]),getPaymentMethods)
router.get("/salesRegion",checkAuth(["SALES"]),getSalesByRegion)
router.get("/lowstock",checkAuth(["SALES"]),lowstock)



router.post("/create-order",checkAuth(["SALES"]),createOrder)
router.put("/update-order",checkAuth(["SALES"]),updateOrder)
router.delete("/delete-order",checkAuth(["SALES"]),deleteOrder)

export default router;
