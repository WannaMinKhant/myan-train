import { ApiSlice } from "./ApiSlice";

export const stationSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStation: builder.query({
            query: () => '/station'
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
    useAddStationMutation,
    useEditStationMutation,
    useDeleteStationMutation
} = stationSlice