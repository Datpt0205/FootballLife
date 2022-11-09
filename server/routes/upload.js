import express from "express";
import uploadMiddleware from "../utils/upload.js";
import { uploadImage } from "../utils/uploadMiddleware.js";
import { auth } from "../utils/auth.js";
import { uploadAvatar } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", uploadImage, uploadMiddleware, auth, uploadAvatar);

export default router;
