import { ApiSlice } from "./ApiSlice";

export const marqueeSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({


        addMarquee: builder.mutation({
            query: (body) => ({
                url: '/marquee',
                method: 'POST',
                body,
            }),
        }),

        deleteMarquee: builder.mutation({
            query: (id) => ({
                url: `/marquee/${id}`,
                method: 'DELETE',
            })
        })



    })
})

export const {
    useAddMarqueeMutation,
    useDeleteMarqueeMutation
} = marqueeSlice