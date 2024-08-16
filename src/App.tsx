import React from "react";
import "./App.css";
import PrimaryButton from "./components/atoms/PrimaryButton";
import GlobalContext from "./contexts/GlobalContext";
import { ModalProvider } from "./contexts/ModalPopup";
import ScrollToTop from "./Routes/ScrollTop";
import { Routes } from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes />
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
