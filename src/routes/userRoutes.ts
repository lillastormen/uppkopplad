import { Router } from "express";
import { createNewUser } from "../controllers/userController.ts";

const router = Router();

router.post('/', createNewUser);

export default router;