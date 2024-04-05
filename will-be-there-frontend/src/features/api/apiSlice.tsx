import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "", // No need for baseUrl since we will be using firebase.
  }),
  endpoints: (builder) => ({
    test: builder.mutation({
      queryFn: async () => {
        await setTimeout(() => {
          console.log("This is a test!");
        }, 10000);
        return { data: "Test" };
      },
    }),
  }),
});

export const { useTestMutation } = apiSlice;
