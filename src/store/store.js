import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./reducers/home.reducer";
import cartReducer from "./reducers/cart.reducer";

const store = configureStore({
    reducer:{
        home:homeReducer,
        cart:cartReducer
    }
})

export default store;