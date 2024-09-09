import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { productsReducer, ProductsState } from "../features/products";

export const store: EnhancedStore<{
  products: ProductsState;
}> = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
