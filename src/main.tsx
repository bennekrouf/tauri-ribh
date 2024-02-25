import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserProvider } from "./UserContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  spacing: 8,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);
