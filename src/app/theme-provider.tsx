"use client";

import { ThemeProvider } from "@mui/material";

import theme from "@/styles/theme";

type ThemeProviderPageProps = {
  children: React.ReactNode;
};

export default function ThemeProviderPage({
  children,
}: ThemeProviderPageProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
