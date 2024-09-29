import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductsFromServer } from "../types/ProductsToCatalog";
import { getProductsByPage } from "../api/api-products";

export type CatalogProductsState = {
  products: ProductsFromServer;
  loading: boolean;
  error: string;
};

const initialState: CatalogProductsState = {
  products: {
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
      offset: 0,
      paged: false,
      unpaged: true,
    },
    last: false,
    totalPages: 0,
    totalElements: 0,
    first: false,
    size: 0,
    number: 0,
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
    numberOfElements: 0,
    empty: true,
  },
  loading: false,
  error: "",
};

export const fetchProductsCatalog = createAsyncThunk<
  ProductsFromServer,
  string
>(
  "products/fetchProductsToCatalog",
  async (search: string): Promise<ProductsFromServer> => {
    try {
      const products = await getProductsByPage(1, search);
      console.log(products);
      return products as ProductsFromServer;
    } catch (error) {
      console.error("Помилка під час отримання продуктів:", error);
      throw error;
    }
  }
);

export const catalogProductsSlice = createSlice({
  name: "catalogProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsCatalog.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsCatalog.rejected, (state) => {
        state.loading = false;
        state.error = "Error!";
      });
  },
});

export const catalogProductsReducer = catalogProductsSlice.reducer;
