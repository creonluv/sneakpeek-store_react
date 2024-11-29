import { getProducts } from "../api/api-products";
import { ProductPageMessages } from "../shared/utils/modalMessages";
import { Product } from "../types/Products";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type ProductsState = {
  products: Product[];
  loading: boolean;
  messages: ProductPageMessages | null;
};

const initialState: ProductsState = {
  products: [],
  loading: false,
  messages: null,
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
      .addCase(fetchAllProducts.pending, (state: ProductsState) => {
        state.loading = true;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state: ProductsState, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAllProducts.rejected, (state: ProductsState) => {
        state.loading = false;
        state.messages = ProductPageMessages.FETCH_PRODUCTS_ERROR;
      });
  },
});

export const productsReducer = productsSlice.reducer;
