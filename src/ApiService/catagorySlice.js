import { ApiSlice } from "./ApiSlice";

export const categorySlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => '/category'
        }),

        addCategory: builder.mutation({
            query: (body) => ({
                url: '/category',
                method: 'POST',
                body,
            }),
        }),
        editCategory: builder.mutation({
            query: (body) => ({
                url: `/category/${body.id}`,
                method: 'POST',
                body,
            })
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            })
        })



    })
})

export const {
    useGetCategoryQuery,
    useAddCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation
} = categorySlice