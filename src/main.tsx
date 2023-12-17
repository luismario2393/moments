import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./theme/global.ts";
import { theme } from "./theme/ThemeUI";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme.default}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
