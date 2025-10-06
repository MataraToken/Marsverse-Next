import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DEV = process.env.NEXT_PUBLIC_API_URL;
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: DEV}),
  keepUnusedDataFor: 30,
  refetchOnReconnect: true,
  endpoints: () => ({}),
  tagTypes: ['tasks', 'user', 'milestone', 'mining', 'bonus']
});





