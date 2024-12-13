interface Producer {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Gender {
  id: number;
  name: string;
}

type Discount = {
  product_id: number;
  name: string;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number;
  discounted_price: number;
  end_date: string;
};

export interface Product {
  id: number;
  producer: Producer;
  category: Category;
  current_discount?: Discount;
  gender: Gender;
  name: string;
  description: string;
  images: string[];
  price: number;
  main_photo_id: number;
}
