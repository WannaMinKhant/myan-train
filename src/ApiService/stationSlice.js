import { ApiSlice } from "./ApiSlice";

export const stationSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStation: builder.query({
            query: () => '/station'
        }),

        getStationAccount: builder.query({
            query: () => '/station-account'
        }),

        addStationAccount: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
        }),

        deleteStationAccount: builder.mutation({
            query: (id) => ({
                url: `/delete-account/${id}`,
                method: 'DELETE',
            })
        }),

        addStation: builder.mutation({
            query: (body) => ({
                url: '/station',
                method: 'POST',
                body,
            }),
        }),
        editStation: builder.mutation({
            query: (body) => ({
                url: `/station/${body.id}`,
                method: 'POST',
                body,
            })
        }),
        deleteStation: builder.mutation({
            query: (id) => ({
                url: `/station/${id}`,
                method: 'DELETE',
            })
        })



    })
})

export const {
    useGetStationQuery,
    useGetStationAccountQuery,
    useAddStationMutation,
    useEditStationMutation,
    useDeleteStationMutation,
    useAddStationAccountMutation,
    useDeleteStationAccountMutation,
} = stationSlice