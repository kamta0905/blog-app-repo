import React from "react";
import { Button, styled } from "@mui/material";
import { PrimaryButtonProps } from "../../../interfaces/PrimaryButtonProps";
import "./PrimeButtonStyle.css";
const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "60px",
}));

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  const { btnSize, id, onClick, disabled, type, iconLeft, label, children, ...rest } = props;

  return (
    <div className={`${btnSize} primButton`}>
      <StyledButton
        variant="contained"
        id={id}
        onClick={onClick}
        disabled={disabled}
        type={type}
        // color={btnColor}
        {...rest}
      >
        {iconLeft}
        {label}
        {children}
      </StyledButton>
    </div>
  );
};

export default PrimaryButton;
