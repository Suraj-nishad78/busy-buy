import { createSlice } from "@reduxjs/toolkit";

const INITIAl_STATE = {
  cartItems: [],
  totalPrice: 0,
  loader: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAl_STATE,
  reducers: {
    setLoader: (state) => {
      state.loader = true;
    },
    setCartItems: (state, action) => {
      state.loader = false;
      state.cartItems = action.payload;
    },
    setTotalPrice: (state, action) => {
        state.totalPrice = action.payload;
    },
  },
});

export const {setLoader, setCartItems, setTotalPrice} = cartSlice.actions;

export default cartSlice.reducer;
