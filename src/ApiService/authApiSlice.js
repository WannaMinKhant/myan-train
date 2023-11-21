import { ApiSlice } from "./ApiSlice";

export const authApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
    
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
            
        }),

        logOut: builder.mutation({
            query: (body) =>({
                url: `/logout`,
                method: 'POST',
                body
            }),
         
        }),

    })
});

export const {
    useLoginMutation,
    useLogOutMutation,
} = authApiSlice