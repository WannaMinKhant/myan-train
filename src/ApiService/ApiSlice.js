import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://192.168.8.102:8000/api/';

const auth = JSON.parse(localStorage.getItem("auth"));

const header = {
    'Authorization': auth == null ? "" : `Bearer ${auth.token}`,
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'enctype': 'multipart/form-data',
}

const createRequest = (url) => ({ url, headers: header });

export const ApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            // console.log(auth)

            // If we have a token set in state, let's assume that we should be passing it.
            if (auth != null) {
                if (auth.token) {
                    headers.set('authorization', `Bearer ${auth.token}`)
                }
            }
            headers.set('Accept', `Application/json`);

            //headers.set('authorization', `Bearer 123`)

            return headers
        },
    }),
    endpoints: (build) => ({

    })
});