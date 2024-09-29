// PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import routes from "../constants/routes";
import { useAuth } from "../contexts/AuthContext";

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

export const PrivateRoute: React.FC<any> = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  return !!isLoggedIn ? children : <Navigate to={routes.signIn} replace />;
};
