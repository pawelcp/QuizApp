import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pushDifficultyLevel } from './selectSlice'

export interface Category {
  id: number;
  name: string;
}

interface CategoryResponse {
  trivia_categories: Category[];
}

interface Results {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

interface QuizByDifficultyAndCategoryResponse {
    response_code: number,
    results: Results[]
}

export const productsApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://opentdb.com/'}),
    endpoints: (builder) => ({
        getCategory: builder.query<CategoryResponse, void>({
            query: () => 'api_category.php',
        }),
        getQuizByDifficultyAndCategory: builder.query<QuizByDifficultyAndCategoryResponse, any>({
            query: ({categoryId, difficultyLevel}) => `api.php?amount=10&category=${categoryId}&difficulty=${difficultyLevel}`
        })
    })
})
