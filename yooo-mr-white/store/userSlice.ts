import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  user: {
    email: string;
    uid: string;
  } | null;
}

interface PayloadTypes {
  email: string;
  uid: string;
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

export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;
