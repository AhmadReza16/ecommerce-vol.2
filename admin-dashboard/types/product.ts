
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;

  image: string | null;
  image_url: string | null;

  is_active: boolean;

  created_at: string;
  updated_at: string;
}

export interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}
