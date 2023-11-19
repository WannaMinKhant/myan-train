import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../ApiService/ApiSlice";

export default configureStore({
    reducer: {
        [ApiSlice.reducerPath]: ApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware),
})