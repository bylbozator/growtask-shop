export interface Product {
  id: number;
  name: string;
  price: number;
  old_price: number | null;
  image: string;
  sku: string;
  quantity: number;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
