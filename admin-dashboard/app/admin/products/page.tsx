import Table from "@/components/Table";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1200, stock: 5 },
  { id: 2, name: "Phone", price: 800, stock: 12 },
];

export default function ProductsPage() {
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
