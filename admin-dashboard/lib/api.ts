
const API_URL = "http://127.0.0.1:8000/api";

export async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      // بعداً JWT اینجا اضافه می‌شود
      // Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.detail || "API Error");
  }

  return res.json();
}

