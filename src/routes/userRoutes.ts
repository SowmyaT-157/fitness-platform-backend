import { Router } from "express";
import { registerUser, verifyEmail } from "../controllers/userController";

export const router = Router();
router.post('/signUp',registerUser )
router.get('/verify', verifyEmail)

// router.post('/signIn',signInUser)