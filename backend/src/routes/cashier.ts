// src/routes/cashier.ts
import { Router } from "express";
import { checkAuth } from "../middleware/auth";
import SyncInventoryandProduct from "../middleware/SyncInventoryandProduct"
import {products,processPayment,order,transaction,generateReceipt,productAvilability,cancelOrder,getCustomerOrders} from "../controllers/cashier"

const router = Router();

router.get("/products", checkAuth(["CASHIER"]), products);
router.post("/order", checkAuth(["CASHIER"]), order);
router.post("/process-payment", checkAuth(["CASHIER"]), processPayment);
router.post("/generatereceipt",SyncInventoryandProduct,checkAuth(["CASHIER"]),generateReceipt)
router.get("/transaction",checkAuth(["CASHIER"]),transaction)
router.get("/product-availability/:productId",checkAuth(["CASHIER"]),productAvilability)
router.post("/cancelorder",checkAuth(["CASHIER"]),cancelOrder)
router.get("/getOrders",checkAuth(["CASHIER"]),getCustomerOrders)

//stock alerts
//invoice
//carts
//order history
//order status

export default router;
