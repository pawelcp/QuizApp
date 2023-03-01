import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { quizApi } from "./apiSlice";
import gameOptionsReducer from "./GameOptionsSlice";
import gameReducer from "./GameSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    gameOptions: gameOptionsReducer,
    game: gameReducer,
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
