import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


interface UserState {
  user: {
    email: string | null;
    uid: string | null;
  } | null;
}

interface PayloadTypes {
  email: string | null;
  uid: string | null;
}
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  } as UserState,
  reducers: {
    login: (state, action: PayloadAction<PayloadTypes>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
