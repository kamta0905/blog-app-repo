import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { CustomInputProps } from "../../../interfaces/CustomInputProps";
import "./CustomInputStyle.css";
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
  marginBottom: 5,
  paddingBottom: 5,
  "& .MuiOutlinedInput-root": {
    "& input": {
      zIndex: 110,
    },
    "& label.Mui-focused": {
      color: "#000000",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "var(--primColor)",
    },
    "&:hover fieldset": {
      borderColor: "var(--primColor)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primColor)",
    },
  },
}));

const CustomInput: React.FC<CustomInputProps> = (props) => {
  return (
    <StyledTextField
      value={props.value}
      autoFocus={props.autoFocus}
      name={props.name}
      autoComplete="off"
      onChange={props.onChange}
      InputProps={{
        inputProps: props.inputProps,
        startAdornment: props.startAdornment,
        endAdornment: props.endAdornment,
      }}
      id={props.id}
      label={props.label}
      type={props.type}
      size={props.size}
      disabled={props.disabled}
      variant="outlined"
      placeholder={props.placeholder}
      error={props.error}
      helperText={props.helperText}
      {...props}
    />
  );
};

export default CustomInput;
