import { Router } from "express";
import { createNewUser, getUser, getUserId, getUsers, loginUser } from "../controllers/userController.ts";

const router = Router();

router.get('/id/:id', getUserId);
router.get('/username/:username', getUser);
router.get('/all/', getUsers);

router.post('/registration', createNewUser);
router.post('/login', loginUser);

export default router;