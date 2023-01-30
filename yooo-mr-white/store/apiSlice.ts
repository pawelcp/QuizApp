import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Category {
    id:number,
    name:string
}

interface CategoryResponse {
    trivia_categories: Category[]
}



export const productsApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://opentdb.com/'}),
    endpoints: (builder) => ({
        getCategory: builder.query<CategoryResponse, void>({
            query: () => 'api_category.php',
        })
    })
})

export const {useGetCategoryQuery} = productsApi