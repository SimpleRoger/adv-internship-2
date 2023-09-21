import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  email: null,
  subscribed: "Basic",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.subscribed = "Basic";
    },
    signOutUser: (state) => {
      state.email = null; // Remove the comma here
    },
    upgradeUser: (state) => {
      state.subscribed = "Premium"; // Remove the comma here
    },
  },
});

export const { setUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
