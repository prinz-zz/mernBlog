import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/posts";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Fetch posts
    fetchAllPosts: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: "GET",
        body: data,
      }),
    }),

    
  }),
});

export const { useFetchAllPostsMutation } = postsApiSlice;
