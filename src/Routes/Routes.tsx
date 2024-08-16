import React, { useContext } from "react";
import PrimaryButton from "../components/atoms/PrimaryButton";
import { ModalContext, ModalProvider } from "../contexts/ModalPopup";
import CustomInput from "../components/atoms/CustomInput";

export const Routes = () => {
  const modalContext = useContext(ModalContext);
  return (
    <div className="mt-5">
      <PrimaryButton label="Primary Button" />
    </div>
  );
};
