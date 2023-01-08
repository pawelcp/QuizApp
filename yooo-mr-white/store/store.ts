import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { productsApi } from "./apiSlice";


export const store = configureStore({
    reducer:{
        user: userReducer,
        [productsApi.reducerPath]: productsApi.reducer
        
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})
