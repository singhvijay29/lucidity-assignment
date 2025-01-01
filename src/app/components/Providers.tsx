"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}
