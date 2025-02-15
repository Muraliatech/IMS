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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.productAvilability = exports.generateReceipt = exports.transaction = exports.processPayment = exports.order = exports.products = void 0;
require("dotenv").config();
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const razorpay_1 = __importDefault(require("razorpay"));
const { KEY_SECRET } = process.env;
const pdfkit_1 = __importDefault(require("pdfkit"));
const bwip_js_1 = __importDefault(require("bwip-js")); // For generating barcodes
if (!KEY_SECRET) {
    throw new Error("KEY_SECRET is not defined in environment variables");
}
const prisma = new client_1.PrismaClient();
const products = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany();
        if (!products) {
            res.status(404).json({ message: "No products found" });
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Products fetched successfully",
            data: products
        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
});
exports.products = products;
// Initialize Razorpay client with your API keys
const razorpay = new razorpay_1.default({
    key_id: 'rzp_test_J10jLLPLBcqXlJ', // Your Razorpay Key ID
    key_secret: 'l5aaBv9Dg20sYxTAv5B0UAQD' // Your Razorpay Key Secret
});
// Controller to create an order
const order = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(KEY_SECRET);
    const { customerId, products } = req.body;
    if (!customerId || !products || !Array.isArray(products)) {
        res.status(400).json({ message: "Invalid request. Please provide customerId and products." });
        return;
    }
    try {
        let totalAmount = 0;
        const orderProducts = [];
        const productIds = products.map((p) => p.productId);
        const fetchedProducts = yield prisma.product.findMany({
            where: { id: { in: productIds } },
        });
        const productMap = new Map(fetchedProducts.map((p) => [p.id, p]));
        for (const { productId, quantity } of products) {
            const product = productMap.get(productId);
            if (!product) {
                res.status(400).json({ message: `Product with ID ${productId} not found` });
                return;
            }
            if (product.stock < quantity) {
                res.status(400).json({ message: `Insufficient stock for product ${product.name}` });
                return;
            }
            const productTotal = product.price * quantity;
            totalAmount += productTotal;
            orderProducts.push({
                productId: product.id,
                quantity,
                price: product.price,
            });
        }
        // Ensure totalAmount is rounded to 2 decimal places
        totalAmount = parseFloat(totalAmount.toFixed(2));
        const razorpayOrder = yield razorpay.orders.create({
            amount: Math.round(totalAmount * 100),
            currency: 'INR',
            receipt: `order_receipt_${Date.now()}`,
            payment_capture: true,
        });
        const newOrder = yield prisma.order.create({
            data: {
                customerId,
                status: client_1.OrderStatus_new.PENDING,
                totalAmount,
                paymentStatus: client_1.PaymentStatus.PENDING,
                orderType: client_1.OrderType.CUSTOMER,
                razorpayOrderId: razorpayOrder.id,
                products: {
                    create: orderProducts.map((orderProduct) => ({
                        productId: orderProduct.productId,
                        quantity: orderProduct.quantity,
                        requestedPrice: orderProduct.price,
                    })),
                },
            },
            include: {
                products: true,
            },
        });
        res.status(201).json({
            message: "Order created successfully",
            order: newOrder,
            razorpay_order_id: razorpayOrder.id,
            amount: totalAmount,
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
        return;
    }
});
exports.order = order;
const processPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, } = req.body;
        // Comprehensive input validation
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            res.status(400).json({ message: "Missing payment details" });
            return;
        }
        // Signature validation
        const generatedSignature = crypto_1.default
            .createHmac("sha256", KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");
        if (generatedSignature !== razorpay_signature) {
            res.status(400).json({ message: "Invalid payment signature" });
            return;
        }
        // Find order using either razorpayOrderId or by matching other conditions
        const order = yield prisma.order.findFirst({
            where: {
                OR: [
                    { razorpayOrderId: razorpay_order_id },
                    { id: razorpay_order_id }
                ]
            },
            include: {
                customer: true,
                products: true,
            },
        });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        if (order.paymentStatus === client_1.PaymentStatus.PAID) {
            res.status(400).json({ message: "Payment already processed" });
            return;
        }
        // Update order with fallback on ID
        const updatedOrder = yield prisma.order.update({
            where: {
                id: order.id // Use the found order's ID
            },
            data: {
                paymentStatus: client_1.PaymentStatus.PAID,
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                status: client_1.OrderStatus_new.COMPLETED,
            },
        });
        // Batch inventory and transaction updates
        const transactionPromises = order.products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const productDetails = yield prisma.product.findUnique({
                where: { id: product.productId }
            });
            if (!productDetails) {
                throw new Error(`Product with ID ${product.productId} not found`);
            }
            // Parallel transaction and inventory updates
            Promise.all([
                prisma.transaction.create({
                    data: {
                        productId: product.productId,
                        quantity: product.quantity,
                        total: product.quantity * productDetails.price,
                        cashierId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                        transactionType: client_1.TransactionType.SALE,
                    },
                }),
                prisma.inventory.update({
                    where: { id: product.productId },
                    data: { quantity: { decrement: product.quantity } },
                })
            ]);
        }));
        // Wait for all updates to complete
        yield Promise.all(transactionPromises);
        res.status(200).json({
            message: "Payment processed successfully",
            order: updatedOrder
        });
        return;
    }
    catch (error) {
        console.error("Payment Processing Error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        return;
    }
});
exports.processPayment = processPayment;
const transaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield prisma.transaction.findMany();
        if (!transactions) {
            res.status(404).json({ message: "No transactions found" });
            return;
        }
        res.status(200).json(transactions);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.transaction = transaction;
const generateReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, includeBarcode } = req.body;
        const order = yield prisma.order.findUnique({
            where: { id: orderId },
            include: { products: { include: { product: true } } },
        });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        const receipt = {
            orderId: order.id,
            products: order.products.map((p) => ({
                name: p.product.name,
                quantity: p.quantity,
                price: p.product.price,
            })),
            totalAmount: order.totalAmount,
            paymentStatus: order.paymentStatus,
            createdAt: order.createdAt,
        };
        const doc = new pdfkit_1.default({ margin: 50 });
        const chunks = [];
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => {
            const pdfBuffer = Buffer.concat(chunks);
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=receipt_${order.id}.pdf`);
            res.send(pdfBuffer);
        });
        // Header
        doc.fontSize(20).text("Prime Mart", { align: "center" });
        doc.fontSize(10).text("Address: Warangal Hanmakonda, 23-10", { align: "center" });
        doc.text("Tel: 11223344", { align: "center" });
        doc.moveDown();
        doc.text("**************************************", { align: "center" });
        doc.fontSize(14).text("CASH RECEIPT", { align: "center" });
        doc.text("**************************************", { align: "center" });
        doc.moveDown();
        // Order Details
        doc.fontSize(12).text(`Order ID: ${receipt.orderId}`);
        doc.text(`Payment Status: ${receipt.paymentStatus}`);
        doc.text(`Total Amount: ₹${receipt.totalAmount.toFixed(2)}`);
        doc.text(`Order Date: ${receipt.createdAt.toDateString()}`);
        doc.moveDown();
        // Product Details
        doc.text("Description          Price");
        receipt.products.forEach((product) => {
            doc.text(`${product.name.padEnd(20)} ₹${(product.price * product.quantity).toFixed(2)}`);
        });
        // Total
        doc.moveDown();
        doc.fontSize(12).text("**************************************");
        doc.fontSize(14).text(`Total Amount: ₹${receipt.totalAmount.toFixed(2)}`);
        doc.fontSize(12).text("**************************************");
        // Barcode (Optional)
        if (includeBarcode) {
            const barcode = yield bwip_js_1.default.toBuffer({
                bcid: "code128", // Barcode type
                text: receipt.orderId, // Data to encode
                scale: 3, // Scaling factor
                height: 10, // Height of the barcode
            });
            doc.image(barcode, {
                fit: [200, 50],
                align: "center",
            });
        }
        // Footer
        doc.moveDown();
        doc.fontSize(10).text("Thank you!", { align: "center" });
        doc.end();
    }
    catch (error) {
        console.error("Error generating receipt:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.generateReceipt = generateReceipt;
const productAvilability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    try {
        const product = yield prisma.product.findUnique({
            where: { id: productId }
        });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product found", stock: product.stock });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.productAvilability = productAvilability;
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    console.log(orderId);
    try {
        const order = yield prisma.order.findUnique({
            where: { id: orderId },
            include: { products: true }
        });
        // if(!order || order.status === "COMPLETED" || order.status === "CANCELLED"){
        //     res.status(404).json({message:"Order not found"})
        //     return;
        // }
        const updatedOrder = yield prisma.order.update({
            where: { id: orderId },
            data: {
                status: client_1.OrderStatus_new.CANCELLED
            }
        });
        res.status(201).json({
            message: "Order cancelled successfully",
            order: updatedOrder
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.cancelOrder = cancelOrder;
