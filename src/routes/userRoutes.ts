import { Router } from "express";
import { presigned, registerUser, signInUser, updateImage, verifyEmail } from "../controllers/userController";

export const router = Router();
router.post('/signUp', registerUser)
router.post('/verify', verifyEmail)
router.post('/signIn',signInUser)
router.put('/image',presigned)
router.patch('/newImage',updateImage)