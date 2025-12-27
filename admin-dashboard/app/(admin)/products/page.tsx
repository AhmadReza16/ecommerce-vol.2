"use client";

import { useEffect, useState } from "react";

import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import SearchInput from "@/components/table/SearchInput";
import Loader from "@/components/feedback/Loader";

import { productsService } from "@/services/products.service";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const pageSize = 10;

  const columns: Array<{
    key: string;
    label: string;
    render?: (value: any, row?: any) => React.ReactNode;
  }> = [
    { key: "name", label: "نام محصول" },
    { key: "price", label: "قیمت" },
    {
      key: "is_active",
      label: "وضعیت",
      render: (value: boolean) =>
        value ? (
          <span className="text-green-600">فعال</span>
        ) : (
          <span className="text-red-500">غیرفعال</span>
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
      console.error("خطا در دریافت محصولات", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">محصولات</h1>

        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="جستجوی محصول..."
        />
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
    </div>
  );
}
