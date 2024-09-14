import React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";
import { InputErrorMsgProps } from "../../../interfaces/ErrorMsg";

const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: -4,
  marginBottom: 10,
  marginLeft: 14,
  fontSize: "0.75rem",
}));

export const InputErrorMsg: React.FC<InputErrorMsgProps> = ({ children }) => {
  return <StyledFormHelperText>{children}</StyledFormHelperText>;
};

export default InputErrorMsg;
