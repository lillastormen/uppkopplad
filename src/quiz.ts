import type { QuizQuestion } from "./types/mysql.ts";

export async function loadQuiz(id: number) {
  try {
    const quizPromise = await fetch(`http://localhost:3000/quiz/${id}`);

    const quiz: QuizQuestion[] = await quizPromise.json();
    showQuiz(quiz);
  } catch (error) {
    console.error(error);
  }
}

function showQuiz(quiz: QuizQuestion[]) {
  console.log(quiz);
  const qq = document.querySelector<HTMLElement>("#quizQuestion");
  const btn = document.querySelector<HTMLElement>("#quizFormBtn");
  const radio = document.querySelector<HTMLElement>("#radioInputs");
  const checkbox = document.querySelector<HTMLElement>("#checkboxInputs");
  const currentQuestion: number = 0;
  if (qq) {
    qq.textContent = quiz[currentQuestion]?.question ?? "";
  }
  if (quiz[currentQuestion]?.multiple_choices && checkbox && radio) {
    checkbox.style.display = "flex";
    radio.style.display = "none";
  } else if (!quiz[currentQuestion]?.multiple_choices && checkbox && radio) {
    checkbox.style.display = "none";
    radio.style.display = "flex";
  }
}
