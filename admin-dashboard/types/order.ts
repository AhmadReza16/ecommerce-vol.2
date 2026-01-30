
export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface ProductInOrder {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string | null;
  slug?: string;
  is_active: boolean;
  seller?: string;
  seller_id?: number;
  average_rating?: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: number;
  product: ProductInOrder | null;
  quantity: number;
  total_price: string;
}

export interface Order {
  id: number;
  user: string;
  user_email?: string;
  status: OrderStatus;
  status_display?: string;
  total_price: string;
  address?: string;
  created_at: string;
  updated_at?: string;
  items: OrderItem[];
}

export interface OrdersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
}
