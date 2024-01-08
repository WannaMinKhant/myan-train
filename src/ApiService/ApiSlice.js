import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:8000/api/v1/admin';


// const createRequest = (url) => ({ url, headers: header });

export const ApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            // console.log(auth)
            const token = (window.localStorage.getItem("token"));
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                if (token) {
                    headers.set('authorization', `Bearer ${token}`)
                }
            }
            headers.set('Accept', `Application/json`);
            headers.set('enctype', `multipart/form-data`);


            //headers.set('authorization', `Bearer 123`)
            // 'enctype':'multipart/form-data',

            return headers
        },
    }),
    endpoints: (build) => ({

    })
});