import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

 
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "products", 
    format: file.mimetype.split("/")[1],  
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  }),
});

export default storage;


 
const upload = multer({ storage });
 
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
       res.status(400).json({ message: "No file uploaded" });
       return
    }

 
    const imageUrl = (req.file as any).path;

     res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Image upload error:", error);
     res.status(500).json({ message: "Internal Server Error" });
     return
  }
};

 
export const uploadMiddleware = upload.single("image");
