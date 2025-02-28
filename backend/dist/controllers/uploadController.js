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
exports.uploadMiddleware = exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            folder: "products",
            format: file.mimetype.split("/")[1],
            transformation: [{ width: 500, height: 500, crop: "limit" }],
        });
    }),
});
exports.default = storage;
const upload = (0, multer_1.default)({ storage });
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        const imageUrl = req.file.path;
        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl,
        });
    }
    catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.uploadImage = uploadImage;
exports.uploadMiddleware = upload.single("image");
