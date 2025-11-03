import { createContext, useContext, useEffect, useState } from "react";
import cartApi from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // cartState ممکنه دو حالت داشته باشه:
  // 1) آبجکت: { id, items: [...], total_price }
  // 2) آرایه مستقیم آیتم‌ها
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isRemovingFromCart, setIsRemovingFromCart] = useState(false);

  const normalize = (data) => {
    // همیشه خروجی را به شکل { items: [...], total_price: number } بازمی‌گردانیم
    if (!data) return { items: [], total_price: 0 };
    if (Array.isArray(data))
      return { items: data, total_price: computeTotal(data) };
    if (data.items)
      return {
        items: data.items,
        total_price: data.total_price ?? computeTotal(data.items),
      };
    return { items: [], total_price: 0 };
  };

  const computeTotal = (items = []) =>
    items.reduce((s, it) => {
      const price = it.product?.price ?? it.price ?? 0;
      const qty = it.quantity ?? it.qty ?? 1;
      return s + Number(price) * Number(qty);
    }, 0);

  const fetchCart = async () => {
    try {
      const res = await cartApi.getCart();
      setCart(normalize(res.data));
    } catch (err) {
      setCart(normalize(null));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    setIsAddingToCart(true);
    try {
      await cartApi.addItem({ product_id: productId, quantity });
      await fetchCart();
    } finally {
      setIsAddingToCart(false);
    }
  };

  const removeFromCart = async (itemId) => {
    setIsRemovingFromCart(true);
    try {
      await cartApi.removeItem(itemId);
      await fetchCart();
    } finally {
      setIsRemovingFromCart(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await cartApi.updateItem(itemId, { quantity });
      await fetchCart();
    } catch (err) {
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setCart(normalize(null));
    } catch (err) {
      throw err;
    }
  };

  const getTotalPrice = () => (cart ? cart.total_price : 0);
  const getItems = () => (cart ? cart.items : []);

  return (
    <CartContext.Provider
      value={{
        cart,
        items: getItems(),
        loading,
        isAddingToCart,
        isRemovingFromCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {!loading ? children : null}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
