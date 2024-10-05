import { client } from "../shared/global/utils/fetchClient";

export const getProducts = () => {
  return client.get(`/products?page=1`);
};

export const getProductsByPage = (page: number, search: string) => {
  return client.get(`/products/filter${search}&page=${page}`);
};
