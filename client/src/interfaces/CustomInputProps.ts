import { TextFieldProps, InputProps as MuiInputProps } from "@mui/material";
import { ReactNode } from "react";
export interface CustomInputProps extends Omit<TextFieldProps, "inputProps"> {
  inputProps?: Partial<MuiInputProps> | any;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  shrink?: boolean;
}
