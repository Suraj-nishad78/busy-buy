import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productRef } from "../../../config/firebaseinit";
import { getDocs } from "firebase/firestore";
import { dataProducts } from "../../data";

const INITIAL_STATE = {
  loader: false,
  error: "",
  products: [],
  searchProduct: [],
  productByPrice: [],
  productByCategory: [],
};

// Function to fetch products from Firestore
export const getProducts = createAsyncThunk(
  "home/getProducts",
  async (_, thunkAPI) => {
    try{

      const fetchProduct = await getDocs(productRef);
      const product = fetchProduct.docs.map((product) => ({
        id: product.id,
        ...product.data(),
      }));
      return product;
    } catch(error){
      return thunkAPI.fulfillWithValue(dataProducts)
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: INITIAL_STATE,
  reducers: {
    loading: (state) => {
      state.loader = true;
    },
    setProducts: (state, action) => {
      state.loader = false;
      state.products = action.payload;
    },
    setSearchProduct: (state, action) => {
      state.searchProduct = action.payload;
    },
    setProductByPrice: (state, action) => {
      state.productByPrice = action.payload;
    },
    setProductByCategory: (state, action) => {
      state.productByCategory = action.payload;
    },
    clearError:(state)=>{
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loader = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loader = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loader = false;
        state.error = "Error while fetching products";
      });
  },
});

export const {
  loading,
  setProducts,
  setSearchProduct,
  setProductByPrice,
  setProductByCategory,
  clearError
} = homeSlice.actions;
export default homeSlice.reducer;
