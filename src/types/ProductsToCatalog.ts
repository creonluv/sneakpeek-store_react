export interface ProductCatalog {
  id: number;
  producer: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  gender: {
    id: number;
    name: string;
  };
  name: string;
  description: string;
  images: number[];
  price: number;
  main_photo_id: number;
  favourite: boolean;
}

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ProductsFromServer {
  content: ProductCatalog[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
