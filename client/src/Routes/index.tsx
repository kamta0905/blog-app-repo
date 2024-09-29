import { Navigate, Route, Routes as RouteConfig } from "react-router-dom";
import routes from "../constants/routes";
import SignUp from "../Themes/LumenX/SignUp";
import SignIn from "../Themes/LumenX/SignIn";
import { PrivateRoute } from "./PrivateRoute";
import Header from "../components/template/Header";
import ProfilePage from "../Themes/LumenX/ProfilePage";
export const Routes = () => {
  return (
    <RouteConfig>
      <Route path={routes.signUp} element={<SignUp />} />
      <Route path={routes.signIn} element={<SignIn />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Header>Dashboard</Header>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Header>
              <ProfilePage />
            </Header>
          </PrivateRoute>
        }
      />
      <Route
        path="/account"
        element={
          <PrivateRoute>
            <Header>My Account</Header>
          </PrivateRoute>
        }
      />
      {/* <Route path="*" element={<Navigate to={routes.signIn} replace />} /> */}
    </RouteConfig>
  );
};
