import { ApiSlice } from "./ApiSlice";

export const TimeTableSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTimeTable: builder.query({
            query: () => '/time-table',
        }),

        addTimeTable: builder.mutation({
            query: (body) => ({
                url: '/time-table',
                method: 'POST',
                body,
            }),
        }),
        editTimeTable: builder.mutation({
            query: (body) => ({
                url: `/time-table/${body.id}`,
                method: 'POST',
                body,
            })
        }),
        deleteTimeTable: builder.mutation({
            query: (id) => ({
                url: `/time-table/${id}`,
                method: 'DELETE',
            })
        })
    })
});

export const {
    useGetTimeTableQuery,
    useAddTimeTableMutation,
    useEditTimeTableMutation,
    useDeleteTimeTableMutation,
} = TimeTableSlice