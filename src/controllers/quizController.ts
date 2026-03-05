import {
  getQuizById,
  createQuizResult,
} from "../repositories/mysql/quizRepository.ts";
import type { Request, Response } from "express";

export async function getQuiz(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "Invalid input, ID must be a number" });
    }

    const quiz = await getQuizById(id);

    if (!quiz) {
      return res.status(404).json({ message: `No quiz found with id: ${id}` });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function postQuizResult(req: Request, res: Response) {
  try {
    const quizId = Number(req.params.quizId);
    const userId = Number(req.params.userId);

    if (isNaN(quizId) || isNaN(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid input, quizID and userID must be a number" });
    }

    const quizResult = await createQuizResult(quizId, userId);
    if (!quizResult) {
      return res.status(404).json({ message: "Could not save quiz result" });
    }
    return res.status(201).json({ message: "Successfully saved quiz result" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
