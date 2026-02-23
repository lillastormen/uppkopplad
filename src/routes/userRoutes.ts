import { Router } from "express";
import { createNewUser, getUser } from "../controllers/userController.ts";
import { registerUser } from "../services/userService.ts";

const router = Router();

router.get('/:username', getUser);
// router.post('/', createNewUser);
router.post('/registration', createNewUser);

export default router;