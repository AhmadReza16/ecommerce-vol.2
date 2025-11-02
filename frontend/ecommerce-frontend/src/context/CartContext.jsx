import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // گرفتن سبد خرید هنگام ورود
  const fetchCart = async () => {
    try {
      const res = await axiosClient.get("cart/");
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axiosClient.post("cart/add/", {
        product_id: productId,
        quantity,
      });
      setCart(res.data);
      toast.success("به سبد اضافه شد");
    } catch {
      toast.error("خطا در افزودن به سبد");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axiosClient.delete(`cart/remove/${itemId}/`);
      fetchCart();
      toast.info("محصول از سبد حذف شد");
    } catch {
      toast.error("خطا در حذف از سبد");
    }
  };

  const clearCart = async () => {
    try {
      await axiosClient.post("cart/clear/");
      setCart({ items: [], total_price: 0 });
    } catch {
      toast.error("خطا در خالی کردن سبد");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
