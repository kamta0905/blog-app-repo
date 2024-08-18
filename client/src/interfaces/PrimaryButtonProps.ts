import { ButtonProps } from "@mui/material/Button";
import React from "react";

export interface PrimaryButtonProps extends ButtonProps {
  btnSize?: string;
  btnColor?: "default" | "inherit" | "primary" | "secondary";
  iconLeft?: React.ReactNode;
  label?: React.ReactNode;
}
