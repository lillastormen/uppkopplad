import { Router } from "express";
import {
  deleteUserAnswers,
  getQuiz,
  getQuizResult,
  postQuizResult,
  postUserAnswer,
} from "../controllers/quizController.ts";

const router = Router();

router.get("/:id", getQuiz);
router.get("/:quizId/:userId", getQuizResult);
router.post("/:quizId/:userId", postQuizResult);
router.post("/:quizResultId/:quizQuestionId/:quizAnswerId", postUserAnswer);
router.delete("/:quizResultId", deleteUserAnswers);

export default router;
