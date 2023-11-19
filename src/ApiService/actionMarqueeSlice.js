import { ApiSlice } from "./ApiSlice";

export const actionMarqueeSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMarquee: builder.query({
            query: () => '/marquee'
        }),
        editMarquee: builder.mutation({
            query: (body) => ({
                url: `/marquee/${body.id}`,
                method: 'POST',
                body,
            })
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
    useGetMarqueeQuery,
    useEditMarqueeMutation,
    useDeleteMarqueeMutation
} = actionMarqueeSlice