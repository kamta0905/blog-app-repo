// ModalContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { ModalContextValue, ModalProviderProps } from "../interfaces/ModalContextValue";

// Create the context with a default value
const ModalContext = createContext<ModalContextValue>({
  isLoginOpen: false,
  isSignupOpen: false,
  isForgotPasswordOpen: false,
  isRegisterToBidOpen: false,
  setLoginOpen: () => {},
  setSignupOpen: () => {},
  setForgotPasswordOpen: () => {},
  setRegisterToBidOpen: () => {},
});

// Define the ModalProvider component
const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isLoginOpen, setLoginOpen] = useState<boolean>(false);
  const [isSignupOpen, setSignupOpen] = useState<boolean>(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState<boolean>(false);
  const [isRegisterToBidOpen, setRegisterToBidOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        isLoginOpen,
        isSignupOpen,
        isForgotPasswordOpen,
        isRegisterToBidOpen,
        setLoginOpen,
        setSignupOpen,
        setForgotPasswordOpen,
        setRegisterToBidOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
