import { Router } from "express";
import { getAQuiz } from "../controllers/quizController.ts";

const router = Router();

router.get("/:id", getAQuiz);

export default router;
