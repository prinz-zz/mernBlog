import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/auth";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Login
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    //Logout
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    //Register
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    //Update
    update: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update/:id`,
        method: "PUT",
        body: data,
      }),
    }),

    //Delete
    delete: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update/:id`,
        method: "DELETE",
        body: data,
      }),
    }),

    
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
