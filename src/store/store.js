import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./reducers/home.reducer";
import cartReducer from "./reducers/cart.reducer";
import orderReducer from "./reducers/order.reducer";

const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
