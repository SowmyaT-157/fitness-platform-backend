import { Router } from "express";
import { createNewPerson } from "../controllers/userController";

export const router = Router();
router.post('/user',createNewPerson)