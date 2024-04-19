"use client";

import { ThemeProvider } from "@mui/material";
import { ThemeProvider as ThemeProviderStyled } from "styled-components";

import theme from "@/styles/theme";
import themeStyled from "@/styles/themeStyled";

type ThemeProviderPageProps = {
  children: React.ReactNode;
};

export default function ThemeProviderPage({
  children,
}: ThemeProviderPageProps) {
  return (
    <ThemeProvider theme={theme}>
      <ThemeProviderStyled theme={themeStyled}>{children}</ThemeProviderStyled>
    </ThemeProvider>
  );
}
