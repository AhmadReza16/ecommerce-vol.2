"use client";

import { useEffect, useState } from "react";

import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import SearchInput from "@/components/table/SearchInput";
import Loader from "@/components/feedback/Loader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

import { productsService } from "@/services/products.service";
import { Product } from "@/types/product";
import { useConfirm } from "@/hooks/useConfirm";
import ProductFormModal from "@/components/modal/ProductFormModal";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const pageSize = 10;
  const { confirm } = useConfirm();

  const columns: Array<{
    key: string;
    label: string;
    render?: (value: any, row?: any) => React.ReactNode;
  }> = [
    {
      key: "image",
      label: "Image",
      render: (value: string | null, row: Product) => (
        <div className="w-12 h-12 flex items-center justify-center">
          {value ? (
            <img
              src={value}
              alt={row.name}
              className="w-12 h-12 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">No Image</span>
            </div>
          )}
        </div>
      ),
    },
    { key: "id", label: "ID" },
    { key: "name", label: "Product Name" },
    { key: "price", label: "Price ($)" },
    { key: "stock", label: "Stock" },
    {
      key: "is_active",
      label: "Status",
      render: (value: boolean) =>
        value ? (
          <Badge color="green">Active</Badge>
        ) : (
          <Badge color="red">Inactive</Badge>
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: Product) => (
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleEdit(row)}>
            Edit
          </Button>

          <Button
            size="sm"
            variant="warning"
            onClick={() => handleToggleActive(row)}
          >
            {row.is_active ? "Disable" : "Enable"}
          </Button>

          <Button size="sm" variant="danger" onClick={() => handleDelete(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productsService.getProducts({
        page,
        search,
      });

      setProducts(res.results);
      setTotal(res.count);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (product: Product) => {
    try {
      await productsService.toggleActive(product.id);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, is_active: !p.is_active } : p,
        ),
      );
    } catch (error) {
      console.error("Error toggling product status:", error);
    }
  };

  const handleDelete = async (product: Product) => {
    const ok = await confirm({
      title: "Delete Product",
      message: `Are you sure you want to delete "${product.name}"?`,
      confirmText: "Delete",
    });

    if (!ok) return;

    try {
      await productsService.deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSaveProduct = async (formData: FormData) => {
    try {
      if (selectedProduct) {
        // Update existing product
        await productsService.updateProduct(selectedProduct.id, formData);
        await fetchProducts();
      } else {
        // Create new product
        await productsService.createProduct(formData);
        await fetchProducts();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>

        <div className="flex gap-2 items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search products..."
          />
          <Button onClick={handleAddNew} className="bg-indigo-600 text-white">
            Add Product
          </Button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Table
            columns={columns as any}
            data={products}
            keyExtractor={(item: Product) => item.id}
          />

          <Pagination
            currentPage={page}
            totalItems={total}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </>
      )}

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />
    </div>
  );
}
