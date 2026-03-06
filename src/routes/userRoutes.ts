import { Router } from "express";
import { registerUser } from "../controllers/userController";

export const router = Router();
router.post('/signUp',registerUser )
// router.post('/signIn',signInUser)