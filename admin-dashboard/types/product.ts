
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug?: string;
  description: string;
  price: number;
  stock: number;
  category?: Category;
  image: string | null;
  is_active: boolean;
  seller?: string;
  seller_id?: number;
  average_rating?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}
