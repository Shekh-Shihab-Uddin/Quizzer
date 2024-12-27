export type FetchQuizeParams = {
  amount: number;
  category: string;
  difficulty: QuizDifficulties;
  type: QuizType;
};

export type QuizCategory = {
  id: number;
  name: string;
};

export type QuizCategoryResponse = {
  trivia_categories: QuizCategory[];
};

export enum QuizDifficulties {
  mixed = "",
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export enum QuizType {
  mixed = "",
  multiple = "multiple",
  trueFalse = "boolean",
}

export type FetchQuizeResopnse = {
  response_code: number;
  results: QuizItem[];
};

export type QuizItem = {
  category: string;
  type: QuizType;
  difficulty: QuizDifficulties;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
