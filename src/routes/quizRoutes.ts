import { Router } from "express";
import {
  getQuiz,
  postQuizResult,
  postUserAnswer,
} from "../controllers/quizController.ts";

const router = Router();

router.get("/:id", getQuiz);
router.post("/:quizId/:userId", postQuizResult);
router.post("/:quizResultId/:quizQuestionId/:quizAnswerId", postUserAnswer);

export default router;
