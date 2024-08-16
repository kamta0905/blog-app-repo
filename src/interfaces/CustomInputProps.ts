import { TextFieldProps, InputProps as MuiInputProps } from "@mui/material";
import { ReactNode } from "react";
export interface CustomInputProps extends Omit<TextFieldProps, "inputProps"> {
  inputProps?: Partial<MuiInputProps> | any; // Correctly type inputProps
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  shrink?: boolean;
}
