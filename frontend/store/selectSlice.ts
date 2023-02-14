import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from './store'

export const selectSlice = createSlice({
  name: 'select',
  initialState: {
   categoryId: {
    categoryId: ''
   },
   difficultyLevel: {
    difficultyLevel: ''
  },
  categoryName: {
    categoryName: ''
  },
  },
  reducers: {
   pushCategoryId: (state, action) => {
    state.categoryId = action.payload;
   },
   pushDifficultyLevel: (state, action) => {
    state.difficultyLevel = action.payload;
   },
   pushCategoryName: (state, action) => {
    state.categoryName = action.payload
   }
  },
});

export const { pushCategoryId, pushDifficultyLevel, pushCategoryName } = selectSlice.actions;

export const selectedCategoryId = (state:RootState) => state.select.categoryId
export const selectedDifficultyLevel = (state:RootState) => state.select.difficultyLevel
export const selectedCategoryName = (state:RootState) => state.select.categoryName


export default selectSlice.reducer;