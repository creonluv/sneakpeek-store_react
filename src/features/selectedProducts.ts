import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Products";

export type SelectedProducts = {
  selectedProducts: Product[];
  selectedProductInstances: number[];
  loading: boolean;
  error: string;
};

const initialState: SelectedProducts = {
  selectedProducts: [],
  selectedProductInstances: [],
  loading: false,
  error: "",
};

const selectedProductsSlice = createSlice({
  name: "selectedProducts",
  initialState: initialState,
  reducers: {
    toggleBuyButton(state, action: PayloadAction<Product>) {
      const selectedProduct = action.payload;

      const index = state.selectedProducts.findIndex(
        (product) => product.id === selectedProduct.id
      );

      if (index !== -1) {
        state.selectedProducts.splice(index, 1);
      } else {
        state.selectedProducts.push(selectedProduct);
      }
      console.log(state);
    },

    toggleSize(state, action: PayloadAction<number>) {
      const productInstance = action.payload;

      if (state.selectedProductInstances.includes(productInstance)) {
        state.selectedProductInstances = state.selectedProductInstances.filter(
          (id) => id !== productInstance
        );
      } else {
        state.selectedProductInstances.push(productInstance);
      }
    },
  },
});

export const { toggleBuyButton, toggleSize } = selectedProductsSlice.actions;

export const selectedProductsReducer = selectedProductsSlice.reducer;
