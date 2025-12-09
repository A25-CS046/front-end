// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom"; // atau "react-router"

const ProtectedRoute = () => {
  // 1. Check Token in LocalStorage
  const token = localStorage.getItem("authToken");

  // 2. if !token navigate to login page
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;