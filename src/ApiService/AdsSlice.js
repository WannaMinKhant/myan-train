import { ApiSlice } from "./ApiSlice";

export const adsSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAds: builder.query({
            query: () => '/ads'
        }),

        addAds: builder.mutation({
            query: (body) => ({
                url: '/ads',
                method: 'POST',
                body,
            }),
        }),
        editAds: builder.mutation({
            query: (body) => ({
                url: `/ads/${body.id}`,
                method: 'POST',
                body,
            })
        }),
        deleteAds: builder.mutation({
            query: (id) => ({
                url: `/ads/${id}`,
                method: 'DELETE',
            })
        })
    })
});

export const {
    useGetAdsQuery,
    useAddAdsMutation,
    useEditAdsMutation,
    useDeleteAdsMutation,
} = adsSlice