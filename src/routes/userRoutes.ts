import { Router } from "express";
import { createNewUser, getUser, getUserId } from "../controllers/userController.ts";
import { registerUser } from "../services/userService.ts";

const router = Router();

router.get('/id/:id', getUserId);

router.get('/username/:username', getUser);

router.post('/registration', createNewUser);

export default router;