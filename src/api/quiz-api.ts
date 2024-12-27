import {
  FetchQuizeParams,
  QuizCategory,
  QuizCategoryResponse,
  QuizItem,
} from "../interfaces/quizType";

const BASE_URL = "https://opentdb.com";

export class QuizAPI {
  static async fetchCategories(): Promise<QuizCategory[]> {
    try {
      const response = await fetch(`${BASE_URL}/api_category.php`);
      const data: QuizCategoryResponse = await response.json();
      return data.trivia_categories;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  static async fetchQuiz(params: FetchQuizeParams): Promise<QuizItem[]> {
    // Replace the placeholders with the provided parameters
    const url = `${BASE_URL}/api.php?amount=${params.amount}&category=${params.category}&difficulty=${params.difficulty}&type=${params.type}`;
    try {
      const response = await fetch(url);
      const data: { results: QuizItem[] } = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
}
