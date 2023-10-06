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

    //Create Post
    createPost: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
  
    
  }),
});

export const { 
  useFetchAllPostsMutation, 
  useCreatePostMutation, 
} = postsApiSlice;
