import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Category {
  id: number;
  name: string;
}

interface CategoryResponse {
  trivia_categories: Category[];
}

export interface Results {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface Questions {
  response_code: number;
  results: Results[];
}

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://opentdb.com/" }),
  endpoints: (builder) => ({
    getCategory: builder.query<CategoryResponse, void>({
      query: () => "api_category.php",
    }),
    getQuestions: builder.query<Questions, any>({
      query: ({ categoryId, difficultyLevel }) =>
        `api.php?amount=10&category=${categoryId}&difficulty=${difficultyLevel}`,
    }),
  }),
});

export const { useGetCategoryQuery } = quizApi;
export const { useGetQuestionsQuery } = quizApi;
