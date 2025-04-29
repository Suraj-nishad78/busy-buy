import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  orders: [],
  userOrders: [],
  loader: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: INITIAL_STATE,
  reducers: {
    setLoader: (state) => {
      state.loader = true;
    },
    setOrders: (state, action) => {
      state.loader = false;
      state.orders = action.payload;
    },
    setUserOrders: (state, action) => {
      state.userOrders = action.payload;
    },
  },
});

export const { setLoader, setOrders, setUserOrders } = orderSlice.actions;
export default orderSlice.reducer;
