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
exports.updateRole = exports.deleteUser = exports.updateUser = exports.listUsers = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT_SECRECT = process.env.JWT_SECRET || "murali";
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, role } = req.body;
    if (!username || !email || !role) {
        res.status(400).json({ message: "Please fill in all fields" });
        return;
    }
    try {
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        const password = username + "@123";
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                username,
                email,
                password: hashpassword,
                role: role,
                isActive: true
            }
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRECT, { expiresIn: "1h" });
        res.status(201).json({ message: "User created successfully", user, token });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.createUser = createUser;
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            where: {
                role: {
                    in: ['MANAGER', 'SALES', 'SUPPLIER', 'CASHIER'],
                },
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true
            }
        });
        if (!users) {
            res.status(404).json({ message: "No users found" });
        }
        res.status(200).json({
            message: "Users listed successfully",
            users
        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.listUsers = listUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { username, email, password, role } = req.body;
    try {
        const existingUser = yield prisma.user.findFirst({
            where: { email }
        });
        if (!existingUser || existingUser.id !== id) {
            res.status(400).json({ message: "User doesnot exist" });
        }
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.update({
            where: { id: id },
            data: {
                username: username,
                email: email,
                password: hashpassword,
                role: role
            }
        });
        res.status(200).json({ message: "User updated successfully", user });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const existinguser = yield prisma.user.findFirst({ where: { id } });
        if (!existinguser) {
            res.status(400).json({ message: "User doesnot exist" });
        }
        const user = yield prisma.user.delete({ where: { id } });
        res.status(200).json({ message: "User deleted successfully", user });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteUser = deleteUser;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { role } = req.body;
    try {
        const existinguser = yield prisma.user.findFirst({ where: { id } });
        if (!existinguser) {
            res.status(400).json({ message: "User doesnot exist" });
        }
        const user = yield prisma.user.update({ where: { id }, data: { role } });
        res.status(200).json({ message: "Role updated successfully", user });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateRole = updateRole;
