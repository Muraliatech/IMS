import express from "express";
import { register, login, forgotPassword, logout, adminregister, adminLogin, supplierRegister ,loginSupplier, updateProfile} from "../controllers/auth";//forgotPassword, resetPassword, logout, verifyToken, refreshToken
import { validationRegister, validationLogin,validateCustomer, checkBlacklist, checkAuth } from '../middleware/auth';
import { profile } from "console";

const router = express.Router();

// // Register a new user
 
router.post("/register", validationRegister, register);
router.post("/admin/register", validationRegister, adminregister);
router.post("/supplier/register", validationRegister, supplierRegister);
 

// // Login an existing user
router.post("/login", validationLogin, login);
router.post("/admin/login", validationLogin, adminLogin);
router.post("/supplier/login", validationLogin, loginSupplier);


// // Forgot password - request reset token
router.post("/forgot-password", forgotPassword);
router.post("/supplier/change-password", checkAuth(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]),forgotPassword);


router.get("/supplier/profile",checkAuth(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]),profile);
router.put("/supplier/profile",checkAuth(["MANUFACTURER", "WHOLESALER", "DISTRIBUTOR"]),updateProfile);

// // Logout user
router.post("/logout", checkBlacklist, logout);

// // Verify token
// router.post("/verify-token", verifyToken);

// // Refresh token
// router.post("/refresh", refreshToken);

export default router;
