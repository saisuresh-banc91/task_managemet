import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiBinsSlice = createApi({
    reducerPath: 'apibins',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
    endpoints: (builder) => ({
        getBins: builder.query<
            {
                id: number
                title: string
                price: number
                description: string
                category: string
            }[],
            void
        >({
            query: () => 'products',
        }),
    }),
})

export const { useGetBinsQuery } = apiBinsSlice
