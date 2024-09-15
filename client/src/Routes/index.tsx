import React, { useContext } from "react";
import { Navigate, Route, Routes as RouteConfig } from "react-router-dom";
import routes from "../constants/routes";
import SignUp from "../Themes/LumenX/SignUp";
import SignIn from "../Themes/LumenX/SignIn";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "../contexts/AuthContext";
export const Routes = () => {
  const isAuthenticated = useAuth();
  return (
    <RouteConfig>
      <Route path={routes.signUp} element={<SignUp />} />
      <Route path={routes.signIn} element={<SignIn />} />
      <Route
        path="/"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated} type="admin">
            <div>Dashboard</div>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to={routes.signIn} replace />} />
    </RouteConfig>
  );
};
