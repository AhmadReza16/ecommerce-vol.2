import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // یا لودر کوچک
  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
