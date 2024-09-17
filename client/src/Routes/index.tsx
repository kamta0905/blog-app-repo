import { Navigate, Route, Routes as RouteConfig } from "react-router-dom";
import routes from "../constants/routes";
import SignUp from "../Themes/LumenX/SignUp";
import SignIn from "../Themes/LumenX/SignIn";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "../contexts/AuthContext";
import DashboardLayout from "../components/template/DashboardLayout";
export const Routes = () => {
  const isAuthenticated = useAuth();
  return (
    <RouteConfig>
      <Route
        path={routes.signUp}
        element={isAuthenticated.isAuthenticated ? <Navigate to="/" replace /> : <SignUp />}
      />
      <Route
        path={routes.signIn}
        element={isAuthenticated.isAuthenticated ? <Navigate to="/" replace /> : <SignIn />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated.isAuthenticated} type="admin">
            <DashboardLayout />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to={routes.signIn} replace />} />
    </RouteConfig>
  );
};
