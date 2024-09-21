import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { productsReducer, ProductsState } from "../features/products";
import { catalogReducer, FiltersState } from "../features/catalog";

export const store: EnhancedStore<{
  products: ProductsState;
  catalog: FiltersState;
}> = configureStore({
  reducer: {
    products: productsReducer,
    catalog: catalogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
