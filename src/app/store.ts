import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { productsReducer, ProductsState } from "../features/products";
import { catalogReducer, FiltersState } from "../features/catalog";
import { paramsReducer, ParamsState } from "../features/params";
import {
  catalogProductsReducer,
  CatalogProductsState,
} from "../features/catalogProducts";
import { productReducer, ProductState } from "../features/product";
import {
  SelectedProducts,
  selectedProductsReducer,
} from "../features/selectedProducts";

export const store: EnhancedStore<{
  products: ProductsState;
  catalog: FiltersState;
  params: ParamsState;
  catalogProducts: CatalogProductsState;
  product: ProductState;
  selectedProducts: SelectedProducts;
}> = configureStore({
  reducer: {
    products: productsReducer,
    catalog: catalogReducer,
    params: paramsReducer,
    catalogProducts: catalogProductsReducer,
    product: productReducer,
    selectedProducts: selectedProductsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
