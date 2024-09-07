import React, { useContext } from "react";
import PrimaryButton from "../components/atoms/PrimaryButton";
import { ModalContext, ModalProvider } from "../contexts/ModalPopup";
import CustomInput from "../components/atoms/CustomInput";
import SignUp from "../Themes/Liquidation/SignUp";

export const Routes = () => {
  const modalContext = useContext(ModalContext);
  return (
    <div className="pt-4">
      <SignUp />
    </div>
  );
};
