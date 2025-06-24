import { client } from "../shared/utils/fetchClient";
import { CartDetails } from "../types/Orders";

export type OrderResponse = object;

export const createOrder = (data: CartDetails): Promise<OrderResponse> => {
  return client.post<OrderResponse>(`/orders`, data);
};
