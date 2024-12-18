import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { theme } from "@styles/theme";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
);
