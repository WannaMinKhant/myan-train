import { ApiSlice } from "./ApiSlice";

export const trainSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTrain: builder.query({
            query: () => '/train'
        }),

        addTrain: builder.mutation({
            query: (body) => ({
                url: '/train',
                method: 'POST',
                body,
            }),
        }),
        editTrain: builder.mutation({
            query: (body) => ({
                url: `/train/${body.id}`,
                method: 'POST',
                body,
            })
        }),
        deleteTrain: builder.mutation({
            query: (id) => ({
                url: `/train/${id}`,
                method: 'DELETE',
            })
        })



    })
})

export const {
    useGetTrainQuery,
    useAddTrainMutation,
    useEditTrainMutation,
    useDeleteTrainMutation
} = trainSlice