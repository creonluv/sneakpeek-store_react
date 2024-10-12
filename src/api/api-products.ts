import { client } from "../shared/global/utils/fetchClient";
import { ProductInstance } from "../types/ProductInstance";
import { Product } from "../types/Products";

export const getProducts = () => {
  return client.get(`/products?page=1`);
};

export const getProductsByPage = (page: number, search: string) => {
  return client.get(`/products/filter${search}&page=${page}`);
};

export const getProductById = (id: string): Promise<Product> => {
  return client.get(`/products/${id}`);
};

export const getProductInstancesAndSizes = (
  id: string
): Promise<ProductInstance[]> => {
  return client.get(`/products/${id}/instances`);
};
