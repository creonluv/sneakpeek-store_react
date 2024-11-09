interface Color {
  id: number;
  name: string;
}

interface Size {
  id: number;
  name: string;
}

interface MainPhoto {
  id: number;
}

interface Category {
  id: number;
  name: string;
}

interface Gender {
  id: number;
  name: string;
}

interface Producer {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  producer: Producer;
  category: Category;
  gender: Gender;
  name: string;
  description: string;
  mainPhoto: MainPhoto;
  images: number[];
  price: number;
  main_photo_id: number;
}

interface ProductInstance {
  id: number;
  product: Product;
  size: Size;
  color: Color;
}

export interface CartItem {
  id: number;
  product_instance: ProductInstance;
  quantity: number;
}

export interface Bucket {
  id: number;
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
