import { apiFetch } from "@/lib/api";
import Table from "@/components/Table";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    products = await apiFetch<Product[]>("/products/");
  } catch {
    return <div className="text-red-600">Failed to load products</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Products</h1>

      <Table
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "price", label: "Price" },
          { key: "stock", label: "Stock" },
        ]}
        data={products}
      />
    </div>
  );
}
