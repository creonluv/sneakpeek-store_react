import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CareInstructions } from "../types/CareInstructions";
import { ProductInstance } from "../types/ProductInstance";
import { Product } from "../types/Products";
import {
  getProductById,
  getProductInstancesAndSizes,
} from "../api/api-products";
import { getMaterialAndCareOfProduct } from "../api/categories";

export type ProductState = {
  product: Product | null;
  materialAndCare: CareInstructions | null;
  productInstancesAndSizes: ProductInstance[];
  loading: boolean;
  error: string;
};

const initialState: ProductState = {
  product: null,
  materialAndCare: null,
  productInstancesAndSizes: [],
  loading: false,
  error: "",
};

export const fetchProductData = createAsyncThunk<
  {
    product: Product;
    materialAndCare: CareInstructions;
    productInstancesAndSizes: ProductInstance[];
  },
  string
>("products/fetchProductData", async (id: string) => {
  const product = await getProductById(id);
  const materialAndCare = await getMaterialAndCareOfProduct("1");
  const productInstancesAndSizes = await getProductInstancesAndSizes(id);
  return { product, materialAndCare, productInstancesAndSizes };
});

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        fetchProductData.fulfilled,
        (
          state,
          action: PayloadAction<{
            product: Product;
            materialAndCare: CareInstructions;
            productInstancesAndSizes: ProductInstance[];
          }>
        ) => {
          state.loading = false;
          state.product = action.payload.product;
          state.materialAndCare = action.payload.materialAndCare;
          state.productInstancesAndSizes =
            action.payload.productInstancesAndSizes;
        }
      )
      .addCase(fetchProductData.rejected, (state) => {
        state.loading = false;
        state.error = "Error!";
      });
  },
});

export const { reducer: productReducer } = ProductSlice;
