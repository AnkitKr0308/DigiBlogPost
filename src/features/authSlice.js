import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = !!action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
