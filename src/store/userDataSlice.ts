import { createSlice } from "@reduxjs/toolkit";

// Types
import { UserState } from "../types/StateTypes";

const initialState: UserState = {
  username: "",
  accessToken: "",
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setUser } = userDataSlice.actions;
export default userDataSlice.reducer;
