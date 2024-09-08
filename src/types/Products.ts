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

export interface Product {
  id: number;
  producer: Producer;
  category: Category;
  gender: Gender;
  name: string;
  description: string;
  images: string[];
  price: number;
  main_photo_id: number;
}
