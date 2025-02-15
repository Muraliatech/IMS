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
exports.updateProfile = exports.profile = exports.logout = exports.forgotPassword = exports.loginSupplier = exports.adminLogin = exports.login = exports.cusomerRegister = exports.supplierRegister = exports.adminregister = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const redisClient_1 = __importDefault(require("../redisClient")); // Redis client
const prisma = new client_1.PrismaClient();
const JWT_SECRECT = process.env.JWT_SECRET || "murali";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, contact } = req.body;
    console.log(req.body);
    try {
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(403).json({
                message: "User already exists",
                status: 403
            });
            return;
        }
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                username,
                email,
                password: hashpassword,
                phone: contact,
                role: 'CUSTOMER',
                isActive: true
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRECT, { expiresIn: "5h" });
        res.status(200).json({
            message: "User created successfully",
            token,
            user
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.register = register;
const adminregister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(403).json({
                message: "Admin already exists",
                status: 403
            });
            return;
        }
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                username,
                email,
                password: hashpassword,
                role: 'ADMIN'
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRECT, { expiresIn: "5h" });
        res.status(200).json({
            message: "ADMIN created successfully",
            token,
            user
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.adminregister = adminregister;
const supplierRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, contact, email, location, password, role } = req.body;
    console.log(req.body);
    if (!username || !email || !password || !contact || !location) {
        res.status(400).json({
            message: "Please enter all fields",
            status: 400,
        });
        return;
    }
    try {
        const existingUser = yield prisma.supplier.findFirst({ where: { email } });
        if (existingUser) {
            res.status(403).json({
                message: "User already exists",
                status: 403,
            });
            return;
        }
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.supplier.create({
            data: {
                name: username,
                contact: contact, // Correct usage: passing the actual contact value
                email,
                password: hashpassword,
                location,
                role,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRECT, { expiresIn: "5h" });
        res.status(200).json({
            message: "Supplier created successfully",
            token,
            user,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
});
exports.supplierRegister = supplierRegister;
const cusomerRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, phone } = req.body;
    if (!username || !email || !password || !phone) {
        res.status(400).json({
            message: "Please enter all fields",
            status: 400,
        });
        return;
    }
    try {
        const existingUser = yield prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            res.status(403).json({
                message: "User already exists",
                status: 403,
            });
            return;
        }
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                username,
                email,
                password: hashpassword,
                phone: phone,
                role: "CUSTOMER",
                isActive: true
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRECT, { expiresIn: "5h" });
        res.status(200).json({
            message: "Supplier created successfully",
            token,
            user,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
});
exports.cusomerRegister = cusomerRegister;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({
                message: "Please enter both email and password",
                status: 400,
            });
            return; // Ensure the function stops execution
        }
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
            res.status(404).json({
                message: "User not found",
                status: 404,
            });
            return;
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isValidPassword) {
            res.status(401).json({
                message: "Invalid password",
                status: 401,
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser.id, role: existingUser.role }, JWT_SECRECT, {
            expiresIn: "5h",
        });
        res.status(200).json({
            message: "User logged in successfully",
            token,
            status: 200,
            user: existingUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
});
exports.login = login;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({
                message: "Please enter both email and password",
                status: 400,
            });
            return; // Ensure the function stops execution
        }
        const existingUser = yield prisma.user.findFirst({
            where: { email, role: 'ADMIN' },
        });
        if (!existingUser) {
            res.status(404).json({
                message: "ADMIN not found",
                status: 404,
            });
            return;
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isValidPassword) {
            res.status(401).json({
                message: "Invalid password",
                status: 401,
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser.id, role: existingUser.role }, JWT_SECRECT, {
            expiresIn: "5h",
        });
        res.status(200).json({
            message: "User logged in successfully",
            token,
            status: 200,
            user: existingUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
});
exports.adminLogin = adminLogin;
const loginSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({
                message: "Please enter both email and password",
                status: 400,
            });
            return; // Ensure the function stops execution
        }
        const existingUser = yield prisma.supplier.findFirst({ where: { email, role: role }, });
        if (!existingUser) {
            res.status(404).json({
                message: "Supplier not found",
                status: 404,
            });
            return;
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isValidPassword) {
            res.status(401).json({
                message: "Invalid password",
                status: 401,
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser.id, role: existingUser.role }, JWT_SECRECT, {
            expiresIn: "5h",
        });
        res.status(200).json({
            message: "User logged in successfully",
            token,
            status: 200,
            user: existingUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
});
exports.loginSupplier = loginSupplier;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        res.status(400).json({
            message: "Email is required",
            status: 400,
        });
        return;
    }
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({
                message: "User not found",
                status: 400,
            });
        }
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        yield prisma.user.update({
            where: { email: email },
            data: {
                password: hashpassword
            }
        });
        res.status(200).json({ message: "Password updated successfully", status: 200 });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
});
exports.forgotPassword = forgotPassword;
const logout = (req, res) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (decoded === null || decoded === void 0 ? void 0 : decoded.exp) {
            redisClient_1.default.setex(token, decoded.exp - Math.floor(Date.now() / 1000), "blacklisted");
        }
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.logout = logout;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.profile = profile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const { username, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const updatedUser = yield prisma.user.update({ where: { email }, data: { username, password: hashpassword } });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateProfile = updateProfile;
