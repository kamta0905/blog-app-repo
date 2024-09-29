import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string, isAdmin: boolean) => void;
  logout: () => void;
  snackbar: SnackbarState;
  showSnackbar: (message: string, severity: SnackbarState["severity"]) => void;
  hideSnackbar: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedIsAdmin = localStorage.getItem("isAdmin");
    if (storedAccessToken && storedRefreshToken) {
      setIsAuthenticated(true);
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setIsAdmin(storedIsAdmin === "true");
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  const login = (accessToken: string, refreshToken: string, isAdmin: boolean) => {
    setIsAuthenticated(true);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAdmin(isAdmin);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("isAdmin", isAdmin.toString());
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isAdmin");
  };

  const showSnackbar = (message: string, severity: SnackbarState["severity"]) => {
    setSnackbar({ open: true, message, severity });
  };

  const hideSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        accessToken,
        refreshToken,
        login,
        logout,
        snackbar,
        showSnackbar,
        hideSnackbar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
