import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { productsApi } from "./apiSlice";
import selectReducer from './selectSlice'


export const store = configureStore({
    reducer:{
        user: userReducer,
        isOpen: selectReducer,
        [productsApi.reducerPath]: productsApi.reducer
        
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})
