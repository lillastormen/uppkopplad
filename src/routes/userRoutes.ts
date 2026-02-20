import { Router } from "express";
import { createNewUser, getUser } from "../controllers/userController.ts";

const router = Router();

router.get('/:username', getUser);
router.post('/', createNewUser);

export default router;