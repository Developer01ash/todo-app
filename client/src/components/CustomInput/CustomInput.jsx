import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const Label = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: "0.813rem",
  color: "rgb(84, 105, 141)",
  paddingLeft: 0,
  lineHeight: "1.375rem",
  letterSpacing: "0.01625rem",
}));

const StyledInput = styled(OutlinedInput)(({ theme, iserror }) => ({
  fontWeight: 500,
  fontSize: "0.813rem",
  lineHeight: "1.75rem",
  letterSpacing: "0.02em",
  borderRadius: "0.25rem",
  background: "#fffff",
  color: "#000",
  border: `${iserror ? "1px" : "2px"} solid ${
    iserror ? "grey" : theme.palette.error.A500
  }`,
  height: "2.375rem",
  paddingLeft: "0.5rem",
  width: "100%",
  "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
    "::placeholder": {
      color: "grey",
    },
  },
  "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
    "::placeholder": {
      color: "grey",
    },
  },
  "& .MuiInputBase-input": {
    ":-webkit-autofill": {
      boxSizing: "border-box",
      border: "0",
      WebkitBoxShadow: "0 0 0 1000px white inset",
      backgroundColor: "transparent !important",
    },
  },
  "& fieldset": { border: "none" },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));

const ErrorText = styled("span")(({ theme }) => ({
  fontWeight: 500,
  color: "red",
  fontSize: "12px",
}));

export const CustomInput = (props) => {
  const {
    labelText,
    onChange,
    error,
    helperText,
    startIcon,
    endIcon,
    isRequired,
    errorWidth,
    startIconCss,
    labelCss,
    errorCss,
    mainBoxCss,
    ...rest
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "0.25rem",
        ...mainBoxCss,
      }}
    >
      {labelText && (
        <Label sx={{ ...labelCss }}>
          {labelText}
          {isRequired && <ErrorText sx={{ p: 0 }}>*</ErrorText>}
        </Label>
      )}
      <FormControl fullWidth>
        <StyledInput
          onChange={onChange}
          iserror={helperText ? "true" : "false"}
          error={error}
          endAdornment={
            <InputAdornment position="end">{endIcon}</InputAdornment>
          }
          autoComplete="off"
          startAdornment={
            <InputAdornment
              position="start"
              sx={{
                cursor: "pointer",
                ...startIconCss,
              }}
            >
              {startIcon}
            </InputAdornment>
          }
          autoFocus={false}
          {...rest}
        />
        {helperText && (
          <ErrorText
            sx={{
              display: "flex",
              width: errorWidth ? errorWidth : "100%",
              flexWrap: "wrap",
              marginTop: "0.2rem",
              ...errorCss,
            }}
          >
            {helperText && helperText}
          </ErrorText>
        )}
      </FormControl>
    </Box>
  );
};
