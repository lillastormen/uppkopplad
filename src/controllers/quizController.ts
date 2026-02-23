import { getQuizById } from "../repositories/mysql/quizRepository.ts";
import type { Request, Response } from "express";

export async function getAQuiz(req: Request, res: Response) {
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
