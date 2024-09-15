import React from "react";
import { Snackbar, SnackbarOrigin, Alert } from "@mui/material";

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  severity: "success" | "info" | "warning" | "error";
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  onClose,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  autoHideDuration = 5000,
  severity,
}) => {
  return (
    <Snackbar anchorOrigin={anchorOrigin} open={open} onClose={onClose} autoHideDuration={autoHideDuration}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
