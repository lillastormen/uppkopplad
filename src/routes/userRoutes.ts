import { Router } from "express";
import { createNewUser, getUser, getUserId, getUsers } from "../controllers/userController.ts";
import { registerUser } from "../services/userService.ts";

const router = Router();

router.get('/id/:id', getUserId);
router.get('/username/:username', getUser);
router.get('/all/', getUsers);

router.post('/registration', createNewUser);

export default router;