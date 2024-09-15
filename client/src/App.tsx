import React from "react";
import "./App.css";
import PrimaryButton from "./components/atoms/PrimaryButton";
import GlobalContext from "./contexts/GlobalContext";
import { ModalProvider } from "./contexts/ModalPopup";
import ScrollToTop from "./Routes/ScrollTop";
import { Routes } from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SnackbarWrapper from "./components/molicules/SnackbarWrapper";
function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <SnackbarWrapper />
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
