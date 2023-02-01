import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pushDifficultyLevel } from "./selectSlice";

export interface Category {
  id: number;
  name: string;
}

interface CategoryResponse {
  trivia_categories: Category[];
}

interface Results {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface QuizByParamsResponse {
  response_code: number;
  results: Results[];
}

export const productsApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://opentdb.com/" }),
  endpoints: (builder) => ({
    getCategory: builder.query<CategoryResponse, void>({
      query: () => "api_category.php",
    }),
    getQuizByParams: builder.query<QuizByParamsResponse, any>({
      query: ({ categoryId, difficultyLevel }) =>
        `api.php?amount=10&category=${categoryId}&difficulty=${difficultyLevel}`,
    }),
  }),
});

export const { useGetCategoryQuery } = productsApi;
export const { useGetQuizByParamsQuery } = productsApi;
