import { Router } from "express";
import { getQuiz, postQuizResult } from "../controllers/quizController.ts";

const router = Router();

router.get("/:id", getQuiz);
router.post("/:quizId/:userId", postQuizResult);

export default router;
