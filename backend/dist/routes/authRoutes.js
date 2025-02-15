"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth"); //forgotPassword, resetPassword, logout, verifyToken, refreshToken
const auth_2 = require("../middleware/auth");
const console_1 = require("console");
const router = express_1.default.Router();
// // Register a new user
router.post("/register", auth_2.validationRegister, auth_1.register);
router.post("/admin/register", auth_2.validationRegister, auth_1.adminregister);
router.post("/supplier/register", auth_2.validationRegister, auth_1.supplierRegister);
// // Login an existing user
router.post("/login", auth_2.validationLogin, auth_1.login);
router.post("/admin/login", auth_2.validationLogin, auth_1.adminLogin);
router.post("/supplier/login", auth_2.validationLogin, auth_1.loginSupplier);
// // Forgot password - request reset token
router.post("/forgot-password", auth_1.forgotPassword);
router.post("/supplier/change-password", (0, auth_2.checkAuth)(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]), auth_1.forgotPassword);
router.get("/supplier/profile", (0, auth_2.checkAuth)(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]), console_1.profile);
router.put("/supplier/profile", (0, auth_2.checkAuth)(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]), auth_1.updateProfile);
// // Logout user
router.post("/logout", auth_2.checkBlacklist, auth_1.logout);
// // Verify token
// router.post("/verify-token", verifyToken);
// // Refresh token
// router.post("/refresh", refreshToken);
exports.default = router;
