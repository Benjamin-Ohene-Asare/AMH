import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../api/api";

const AdminProtectedRoute = () => {
  const token =
    localStorage.getItem("amh_auth_token") ||
    sessionStorage.getItem("amh_auth_token");

  const user = getCurrentUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "SUPER_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;