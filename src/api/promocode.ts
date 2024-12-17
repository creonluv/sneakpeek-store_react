import { client } from "../shared/utils/fetchClient";
import { Discount } from "../types/Discount";

type PromoData = {
  cart_id: number;
  promo_code: string;
};

export const applyPromocode = (data: PromoData) => {
  return client.post(`/cart-promo-codes/apply`, data);
};

export const getAllDiscounts = (): Promise<Discount[]> => {
  return client.get(`/discounts/active`);
};

export const deletePromocode = (cartId: number) => {
  return client.delete(`/cart-promo-codes/revoke/${cartId}`);
};
