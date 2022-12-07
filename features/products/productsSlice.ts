import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const productsUrl = "https://dummyjson.com/products";

export type productsState = {
  products: Object[];
  status: string;
  error: boolean;
};

const initialState = { products: [], status: "idle", error: false };

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(productsUrl);
      return response.data.products.map((product: any) => {
        delete product.images;
        delete product.discountPercentage;
        delete product.thumbnail;
        delete product.description;
        return product;
      });
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return String(error);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const selectProducts = (state: RootState) => {
  return state.products;
};

export default productsSlice.reducer;
