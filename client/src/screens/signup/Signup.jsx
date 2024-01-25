import React, { useEffect, useState } from "react";
import { Box, Container, IconButton, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import { PrimaryButton, CustomInput } from "../../components";
import { HttpClient } from "../../apis/api";
import { SignUpSchema } from "../../utils";

const StyledForm = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}));

export const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      const lowercaseEmail = values.email.toLowerCase();
      try {
        if (lowercaseEmail) {
          console.log("🚀 ~ onSubmit: ~ lowercaseEmail:", lowercaseEmail);
          const response = await HttpClient.post("auth/register", {
            username: lowercaseEmail,
            email: lowercaseEmail,
            password: values.password,
          });

          if (response.status === 200) {
            navigate("/");
          }
          if (response.status === 403) {
            setErrors(response.error);
          }
        }
      } catch (error) {
        console.error(
          "An error occurred during registration:",
          error?.response?.data?.error
        );
        formik.setFieldError("email", error?.response?.data?.error);
      }
    },
  });

  useEffect(() => {
    if (errors?.length > 0) {
      formik.setFieldError("email", errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, formik?.values]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            margin: "0px auto",
            padding: (theme) => theme.spacing(2),
            borderRadius: (theme) => theme.shape.borderRadius,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            color: (theme) => theme.palette.text.primary,
            display: "flex",
            flexDirection: "column",
            gap: (theme) => theme.spacing(2),
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Sign Up
          </Typography>
          <StyledForm>
            <CustomInput
              name="email"
              labelText="Username"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <CustomInput
              name="password"
              labelText="Password"
              placeholder="Password"
              onBlur={formik.handleBlur}
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              fullWidth
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              endIcon={
                <IconButton
                  onClick={handleTogglePassword}
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    width: "auto",
                    height: "1rem",
                    transform: "translateY(-50%)",
                  }}
                >
                  {!showPassword ? (
                    <VisibilityOff sx={{ width: "1rem" }} />
                  ) : (
                    <Visibility sx={{ width: "1rem" }} />
                  )}
                </IconButton>
              }
            />
            <CustomInput
              name="confirmPassword"
              labelText="Confirm Password"
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              fullWidth
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              endIcon={
                <IconButton
                  onClick={handleToggleConfirmPassword}
                  sx={{
                    width: "auto",
                    height: "1rem",
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {!showConfirmPassword ? (
                    <VisibilityOff sx={{ width: "1rem" }} />
                  ) : (
                    <Visibility sx={{ width: "1rem" }} />
                  )}
                </IconButton>
              }
            />
            <PrimaryButton
              type="submit"
              variant="contained"
              onClick={() => {
                formik.handleSubmit();
              }}
              fullWidth
              // disabled={!formik.isValid}
            >
              Sign up
            </PrimaryButton>
          </StyledForm>

          <Typography variant="body2">
            Already have an account? <Link to={"/"}>Sign In</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
