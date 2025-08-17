// src/utils/RoleBasedRoutes.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBasedRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user && requiredRole.includes(user.role)
    ? children
    : <Navigate to="/login" />;
};

export default RoleBasedRoutes;
