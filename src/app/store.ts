import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { productsReducer, ProductsState } from "../features/products";
import { catalogReducer, FiltersState } from "../features/catalog";
import { paramsReducer, ParamsState } from "../features/params";
import {
  catalogProductsReducer,
  CatalogProductsState,
} from "../features/catalogProducts";

export const store: EnhancedStore<{
  products: ProductsState;
  catalog: FiltersState;
  params: ParamsState;
  catalogProducts: CatalogProductsState;
}> = configureStore({
  reducer: {
    products: productsReducer,
    catalog: catalogReducer,
    params: paramsReducer,
    catalogProducts: catalogProductsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
