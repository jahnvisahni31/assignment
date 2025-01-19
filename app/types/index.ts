export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [key: number]: string };
  visitedQuestions: Set<number>;
  timeRemaining: number;
  email: string;
  isComplete: boolean;
}