// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getNewses: builder.query({
      query: () => "/news",
    }),
    getSingleNews: builder.query({
      query: (id) => `/news/${id}`,
    }),
  }),
});

export const { useGetNewsesQuery, useGetSingleNewsQuery } = apiSlice;
