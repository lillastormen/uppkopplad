export interface QuizAnswer {
  answer: string;
  is_correct: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
  multiple_choices: boolean;
}
