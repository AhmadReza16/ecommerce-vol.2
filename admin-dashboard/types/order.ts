

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "cancelled";

export interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: string;
}

export interface Order {
  id: number;
  user: number;
  user_email: string;

  status: OrderStatus;
  total_price: string;

  created_at: string;
  updated_at: string;

  items: OrderItem[];
}

export interface OrdersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
}
