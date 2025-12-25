
export interface User {
  id: number;
  username: string;
  email: string;

  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;

  last_login: string | null;
  date_joined: string;
}

export interface UsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}
