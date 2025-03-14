"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = exports.getItemById = exports.products = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const products = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany();
        res.status(200).json({ products });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.products = products;
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield prisma.product.findUnique({ where: { id: id } });
        console.log(product);
        res.status(200).json({ product: product });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getItemById = getItemById;
const order = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { cart } = req.body;
    console.log(cart);
    const customerid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log("customerid : " + customerid);
    try {
        // Ensure totalAmount is properly calculated
        const totalAmount = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
        if (!customerid) {
            res.status(400).json({ message: "Customer ID is required" });
            return;
        }
        if (!cart || cart.length === 0) {
            res.status(400).json({ message: "Cart cannot be empty" });
            return;
        }
        const order = yield prisma.order.create({
            data: {
                customerId: customerid,
                orderType: client_1.OrderType.CUSTOMER,
                status: "PENDING",
                totalAmount: totalAmount,
                paymentStatus: "PENDING",
                products: {
                    create: cart.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity || 1,
                    })),
                },
            },
            include: {
                products: true,
            },
        });
        res.status(201).json({
            message: "Order placed successfully",
            order,
        });
    }
    catch (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
});
exports.order = order;
