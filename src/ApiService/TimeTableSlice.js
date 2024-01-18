import { ApiSlice } from "./ApiSlice";

export const TimeTableSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTimeTable: builder.query({
            query: () => '/time-table',
        }),
        getAllLaneStation: builder.query({
            query: () => '/lane-station',
        }),

        addTimeTable: builder.mutation({
            query: (body) => ({
                url: '/time-table',
                method: 'POST',
                body,
            }),
        }),
        getLaneStation: builder.mutation({
            query: (body) => ({
                url: '/lane-station',
                method: 'POST',
                body,
            }),
        }),
        addLaneStation: builder.mutation({
            query: (body) => ({
                url: '/time-duration',
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
        }),
        deleteLaneStation: builder.mutation({
            query: (id) => ({
                url: `/time-duration/${id}`,
                method: 'DELETE',
            })
        }),
    })
});

export const {
    useGetTimeTableQuery,
    useAddTimeTableMutation,
    useEditTimeTableMutation,
    useDeleteTimeTableMutation,
    useGetLaneStationMutation,
    useAddLaneStationMutation,
    useGetAllLaneStationQuery,
    useDeleteLaneStationMutation,
} = TimeTableSlice