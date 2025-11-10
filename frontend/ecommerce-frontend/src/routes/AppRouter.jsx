import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Success from "../pages/Success";
import Profile from "../pages/Profile";
import Order from "../pages/Order";
import ProtectedRoute from "../components/ProtectedRoute";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<Success />} />
      <Route path="/profile" element={<ProtectedRoute />}>
        <Route path="" element={<Profile />} />
      </Route>
      <Route path="/orders/:id" element={<Order />} />
    </Routes>
  );
};

export default AppRouter;
