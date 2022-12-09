import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const binsSlice = createApi({
  reducerPath: "bins",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getBins: builder.query<[], void>({ query: () => "products" }),
  }),
});

export const { useGetBinsQuery } = binsSlice;
