import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { PublicRoute, ProtectedRoute } from "./router";
import { Login, Dashboard, SignUp } from "./screens";

const theme = createTheme();
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={"/dashboard"} element={<Dashboard />} replace />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
