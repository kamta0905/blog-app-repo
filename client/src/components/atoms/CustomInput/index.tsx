// CustomInput.tsx
import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { CustomInputProps } from "../../../interfaces/CustomInputProps";
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
  marginBottom: 5,
  "& .MuiInputLabel-outlined": {
    fontSize: "14px",
    transform: "none",
    position: "relative",
    color: "#595959",
    fontFamily: "Poppins",
    paddingBottom: 5,
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "none",
  },
  "& label.Mui-focused": {
    color: "#595959",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--primColor)",
  },
  "& .MuiOutlinedInput-root": {
    "& input": {
      zIndex: 110,
    },
    "& fieldset": {
      background: "#fff",
      "& legend": {
        display: "none",
      },
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
