import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:5050/" });

export const apiSlice = createApi({
  baseQuery,
  tagType: ["User", "Post"],
  endpoints: (builder) => ({}),
});
