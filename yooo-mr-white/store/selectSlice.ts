import { createSlice } from "@reduxjs/toolkit"

export const selectSlice = createSlice({
  name: 'select',
  initialState: {
    isOpen: false
  },
  reducers: {
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false;
      
    },
  },
});

export const { open, close } = selectSlice.actions;

export default selectSlice.reducer;