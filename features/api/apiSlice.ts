import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<{ products: [] }, void>({
      query: () => "products",
    }),
    getUserById: builder.query<
      {
        username: string;
        email: string;
        company: { name: string };
        website: string;
        phone: number;
        address: { address: string; coordinates: { lat: number; lng: number } };
        domain: string;
      },
      string
    >({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetUserByIdQuery } = apiSlice;
