import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setClearInputBox: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
    },
  },
});

export const { setName, setEmail, setPassword, setClearInputBox } =
  userSlice.actions;

export default userSlice.reducer;
