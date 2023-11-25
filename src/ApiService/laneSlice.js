import { ApiSlice } from "./ApiSlice";

export const laneSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLane: builder.query({
            query: () => '/lane'
        }),

        addLane: builder.mutation({
            query: (body) => ({
                url: '/lane',
                method: 'POST',
                body,
            }),
        }),
        editLane: builder.mutation({
            query: (body) => ({
                url: `/lane/${body.id}`,
                method: 'POST',
                body,
            })
        }),
        deleteLane: builder.mutation({
            query: (id) => ({
                url: `/lane/${id}`,
                method: 'DELETE',
            })
        })
    })
});

export const {
    useGetLaneQuery,
    useAddLaneMutation,
    useEditLaneMutation,
    useDeleteLaneMutation,
} = laneSlice