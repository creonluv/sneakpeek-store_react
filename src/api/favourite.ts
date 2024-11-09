import { client } from "../shared/utils/fetchClient";
import { Product } from "../types/Bucket";

export function getFavourite(): Promise<Product[]> {
  return client.get(`/users/wishlist`);
}

export const addNewItemToFavourite = (
  productId: number | undefined
): Promise<Product> => {
  return client.post(`/users/wishlist/${productId}`, null);
};

export const deleteItemToFavourite = (
  productId: number | undefined
): Promise<Product> => {
  return client.delete(`/users/wishlist/${productId}`);
};
