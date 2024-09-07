import React, { useContext } from "react";
import PrimaryButton from "../components/atoms/PrimaryButton";
import { ModalContext, ModalProvider } from "../contexts/ModalPopup";
import CustomInput from "../components/atoms/CustomInput";
import SignUp from "../Themes/Liquidation/SignUp";
import { Route, Routes as RouteConfig } from "react-router-dom";
import routes from "../constants/routes";
import SignIn from "../Themes/Liquidation/SignIn";

export const Routes = () => {
  const modalContext = useContext(ModalContext);
  return (
    <RouteConfig>
      <Route path={routes.signUp} element={<SignUp />} />
      <Route path={routes.signIn} element={<SignIn />} />
    </RouteConfig>
  );
};
