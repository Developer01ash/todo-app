/* eslint-disable  */
import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "white",
  borderRadius: "2rem",
  fontWeight: 500,
  fontSize: "0.813rem",
  lineHeight: "1.375rem",
  height: "2.375rem",
  padding: "0.5rem 1rem",
  boxShadow: "none",
  ":disabled": {
    color: "white",
    cursor: "not-allowed",
  },
  [":hover"]: {
    boxShadow: "none",
  },
}));

export const PrimaryButton = (props) => {
  const { children, ...rest } = props;
  return (
    <StyledButton
      variant="contained"
      sx={{
        ":hover": {},
      }}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
