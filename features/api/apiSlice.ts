import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from '../../types/product'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        getProducts: builder.query<{ products: Object[] }, void>({
            query: () => 'products',
        }),

        addProduct: builder.mutation<void, Product>({
            query: (product) => ({
                url: 'products',
                method: 'POST',
                body: product,
            }),
        }),

        updateProduct: builder.mutation<void, Product>({
            query: ({ id, ...rest }) => ({
                url: `products/${id}`,
                method: 'PUT',
                body: rest,
            }),
        }),

        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
        }),

        getUserById: builder.query<
            {
                username: string
                email: string
                company: { name: string }
                website: string
                phone: number
                address: {
                    address: string
                    coordinates: { lat: number; lng: number }
                }
                domain: string
            },
            string
        >({
            query: (id) => `users/${id}`,
        }),
    }),
})

export const {
    useGetProductsQuery,
    useGetUserByIdQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = apiSlice
