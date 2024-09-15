import React from "react";
import { Navigate } from "react-router-dom";
import routes from "../constants/routes";

interface PrivateRouteProps {
  children: React.ReactNode;
  type?: string;
  isAuthenticated: boolean | any;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ type, children, isAuthenticated }) => {
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to={isAuthenticated ? routes.signUp : routes.signIn} replace />;
  }
};
