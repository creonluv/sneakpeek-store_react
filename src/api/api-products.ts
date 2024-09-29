import { client } from "../shared/global/utils/fetchClient";

export const getProducts = () => {
  return client.get(`/products?page=1`);
};

export const getProductsByPage = (page: number, search: string) => {
  console.log(
    `http://localhost:9091/api/products/filter${search}&page=${page}`
  );
  return client.get(`/products/filter${search}&page=${page}`);
};
