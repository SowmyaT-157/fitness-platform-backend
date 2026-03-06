import { Router } from "express";
import { registerUser, signInUser, verifyEmail } from "../controllers/userController";

export const router = Router();
router.post('/signUp', registerUser)
router.post('/verify', verifyEmail)
router.post('/signIn',signInUser)