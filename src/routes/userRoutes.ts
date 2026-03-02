import { Router } from "express";
import { registerUser, signInUser } from "../controllers/userController";
import { createNewPerson } from "../controllers/userController";

export const router = Router();
router.post('/user',createNewPerson)
router.post('/signUp',registerUser )
router.post('/signIn',signInUser)