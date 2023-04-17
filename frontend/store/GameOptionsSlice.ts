import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const gameOptionsSlice = createSlice({
  name: "gameOptions",
  initialState: {
    categoryId: "",
    categoryName: "qweqwe qweqwe",
    difficultyLevel: "MEDIUM",
  },
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setDifficultyLevel: (state, action) => {
      state.difficultyLevel = action.payload;
    },
    setCategoryName: (state, action) => {
      state.categoryName = action.payload;
    },
  },
});

export const { setCategoryId, setDifficultyLevel, setCategoryName } =
  gameOptionsSlice.actions;

export const categoryId = (state: RootState) => state.gameOptions.categoryId;
export const difficultyLevel = (state: RootState) =>
  state.gameOptions.difficultyLevel;
export const categoryName = (state: RootState) =>
  state.gameOptions.categoryName;

export default gameOptionsSlice.reducer;
