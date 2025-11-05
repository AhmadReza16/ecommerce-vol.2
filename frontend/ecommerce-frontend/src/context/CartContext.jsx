import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import cartApi from "../api/cartApi";

const CartContext = createContext();

// helpers: move outside component so useCallback can have stable deps
const computeTotal = (items = []) =>
  items.reduce((s, it) => {
    const price = it.product?.price ?? it.price ?? 0;
    const qty = it.quantity ?? it.qty ?? 1;
    return s + Number(price) * Number(qty);
  }, 0);

const normalize = (data) => {
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

export const CartProvider = ({ children }) => {
  // cartState ممکنه دو حالت داشته باشه:
  // 1) آبجکت: { id, items: [...], total_price }
  // 2) آرایه مستقیم آیتم‌ها
  // internal normalized cart object: { items: [...], total_price: number }
  const [cartObj, setCartObj] = useState({ items: [], total_price: 0 });
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isRemovingFromCart, setIsRemovingFromCart] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const res = await cartApi.getCart();
      setCartObj(normalize(res.data));
    } catch {
      setCartObj(normalize(null));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

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
    await cartApi.updateItem(itemId, { quantity });
    await fetchCart();
  };

  const clearCart = async () => {
    await cartApi.clearCart();
    setCartObj(normalize(null));
  };

  const getTotalPrice = () => (cartObj ? cartObj.total_price : 0);
  const getItems = () => (cartObj ? cartObj.items : []);

  return (
    <CartContext.Provider
      value={{
        // keep backward-compatible exports: cart (array of items) and total
        cart: getItems(),
        items: getItems(),
        total: getTotalPrice(),
        raw: cartObj,
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
