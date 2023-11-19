import { ApiSlice } from "./ApiSlice";

export const messageSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessage: builder.query({
            query: () => '/message'
        }),

        addMessage: builder.mutation({
            query: (body) => ({
                url: '/message',
                method: 'POST',
                body,
            }),
        }),
        editMessage: builder.mutation({
            query: (body) => ({
                url: `/message/${body.id}`,
                method: 'POST',
                body,
            })
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/message/${id}`,
                method: 'DELETE',
            })
        })



    })
})

export const {
    useGetMessageQuery,
    useAddMessageMutation,
    useEditMessageMutation,
    useDeleteMessageMutation
} = messageSlice