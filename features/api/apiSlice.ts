import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query({ query: () => "/products" }),
    getUsers: builder.query({ query: () => "/users" }),
  }),
});

export const { useGetProductsQuery, useGetUsersQuery } = apiSlice;
