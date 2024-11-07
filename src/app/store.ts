import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../features/products";
import { catalogReducer } from "../features/catalog";
import { paramsReducer } from "../features/params";
import { catalogProductsReducer } from "../features/catalogProducts";
import { productReducer } from "../features/product";
import { selectedProductsReducer } from "../features/selectedProducts";
import { bucketReducer } from "../features/bucket";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    catalog: catalogReducer,
    params: paramsReducer,
    catalogProducts: catalogProductsReducer,
    product: productReducer,
    selectedProducts: selectedProductsReducer,
    bucket: bucketReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
