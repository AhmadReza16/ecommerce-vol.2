import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import productApi from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    page: parseInt(searchParams.get("page")) || 1,
    category: searchParams.get("category") || "",
    search: searchParams.get("search") || "",
  });

  // Keep in sync with backend ProductPagination.page_size
  const PAGE_SIZE = 12;

  useEffect(() => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.page > 1) params.page = filters.page;
    setSearchParams(params);
  }, [filters, setSearchParams]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        // Only pass non-empty filters to API
        const queryParams = { page: filters.page };
        if (filters.search) queryParams.search = filters.search;
        if (filters.category) queryParams.category = filters.category;

        const res = await productApi.getProducts(queryParams);
        // Handle both paginated and non-paginated responses
        const productsData = res.results || (Array.isArray(res) ? res : []);
        const countData = res.count || productsData.length;
        setProducts(productsData);
        setCount(countData);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          err?.response?.data?.detail ||
            err.message ||
            "Failed to load products"
        );
        setProducts([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (data) => {
    setFilters((prev) => ({ ...prev, ...data, page: 1 }));
  };

  const handlePageChange = (page) => {
    // Clamp requested page to available pages to avoid DRF returning 404 for out-of-range pages
    const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
    const clamped = Math.max(1, Math.min(page, totalPages));
    setFilters((prev) => ({ ...prev, page: clamped }));
  };

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  if (loading) return <Loader />;

  if (error) {
    return (
      <>
        <Header />
        <main className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>
              <strong>Error:</strong> {error}
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>
        <SearchFilter onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  );
};

export default Home;
