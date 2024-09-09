import { getProducts } from "../api/api-products";
import { Product } from "../types/Products";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type ProductsState = {
  products: Product[];
  loading: boolean;
  error: string;
};

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: "",
};

export const fetchAllProducts = createAsyncThunk<Product[], void>(
  "products/fetchAllProducts",
  async () => {
    const products = await getProducts();
    if (Array.isArray(products)) {
      return products;
    } else {
      throw new Error("Invalid data format");
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Error!";
      });
  },
});

export const productsReducer = productsSlice.reducer;
