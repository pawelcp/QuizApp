import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export interface Product {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    rating: number[],
    title: string,
}


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com'}),
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], void>({
            query: () => 'products',
        })
    })
})

export const {useGetAllProductsQuery} = productsApi