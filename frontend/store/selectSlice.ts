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
  },
  reducers: {
   pushCategoryId: (state, action) => {
    state.categoryId = action.payload;
   },
   pushDifficultyLevel: (state, action) => {
    state.difficultyLevel = action.payload;
   }
  },
});

export const { pushCategoryId, pushDifficultyLevel } = selectSlice.actions;

export const selectedCategory = (state:RootState) => state.select.categoryId
export const selectedDifficultyLevel = (state:RootState) => state.select.difficultyLevel


export default selectSlice.reducer;