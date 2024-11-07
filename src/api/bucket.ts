import { client } from "../shared/utils/fetchClient";
import {
  Bucket,
  CartItem,
  itemInBucket,
  UpdateItemInBucketPayload,
} from "../types/Bucket";

export const getBucket = (): Promise<Bucket> => {
  return client.get(`/carts/my`);
};

export const addNewItemToBucket = (
  bucketId: number | undefined,
  data: itemInBucket
): Promise<CartItem> => {
  return client.post(`/carts/${bucketId}/items`, data);
};

export const updateNewItemToBucket = (
  bucketId: number | undefined,
  id: number | undefined,
  data: UpdateItemInBucketPayload
): Promise<CartItem> => {
  return client.put(`/carts/${bucketId}/items/${id}`, data);
};

export const deleteNewItemInBucket = (
  bucketId: number | undefined,
  id: number
) => {
  return client.delete(`/carts/${bucketId}/items/${id}`);
};
