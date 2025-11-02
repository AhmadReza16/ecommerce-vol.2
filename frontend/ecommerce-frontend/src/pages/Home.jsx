import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosClient.get("products/").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">محصولات</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
