import { Product } from "./Products";

interface Color {
  id: number;
  name: string;
}

interface Size {
  id: number;
  name: string;
}

interface ProductInstance {
  id: number;
  product: Product;
  size: Size;
  color: Color;
  present: number;
}

export interface CartItem {
  id: number;
  product_instance: ProductInstance;
  quantity: number;
}

export interface PromoCodeInfo {
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  end_date: string;
}

export interface Bucket {
  id: number;
  applied_promo_code: PromoCodeInfo | null;
  cart_items: CartItem[];
  user_id: number;
}

export interface itemInBucket {
  cart_id: number | undefined;
  product_instance_id: number | undefined;
  quantity: number;
}

export interface UpdateItemInBucketPayload extends itemInBucket {
  id: number;
}
