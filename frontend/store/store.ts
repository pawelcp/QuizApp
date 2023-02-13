import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { productsApi } from "./apiSlice";
import selectReducer from './selectSlice'
import quizViewReducer from "./quizViewSlice";


export const store = configureStore({
    reducer:{
        user: userReducer,
        select: selectReducer,
        quizView: quizViewReducer.reducer,
        [productsApi.reducerPath]: productsApi.reducer
        
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
    
})
export type RootState = ReturnType<typeof store.getState>

