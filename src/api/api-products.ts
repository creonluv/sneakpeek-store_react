import { client } from "../shared/global/utils/fetchClient";

export const getProducts = () => {
  return client.get(`/products?page=1`);
};
