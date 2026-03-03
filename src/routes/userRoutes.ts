import { Router } from "express";
import { registerUser, signInUser } from "../controllers/userController";

export const router = Router();
router.post('/signUp',registerUser )
router.post('/signIn',signInUser)