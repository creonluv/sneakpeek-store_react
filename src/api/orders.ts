import { client } from "../shared/utils/fetchClient";
import { CartDetails } from "../types/Orders";

export interface OrderResponse {}

export const createOrder = (data: CartDetails): Promise<OrderResponse> => {
  return client.post<OrderResponse>(`/orders`, data);
};
