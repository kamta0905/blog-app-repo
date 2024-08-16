import React from "react";
export interface ModalContextValue {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  isForgotPasswordOpen: boolean;
  isRegisterToBidOpen: boolean;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setForgotPasswordOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterToBidOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModalProviderProps {
  children: React.ReactNode;
}
