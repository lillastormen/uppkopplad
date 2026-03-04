import { Router } from "express";
import { getAQuiz, postQuizResult } from "../controllers/quizController.ts";

const router = Router();

router.get("/:id", getAQuiz);
router.post("/:id", postQuizResult);

export default router;
