'use client';

import { ThemeProvider } from '@mui/material';
import { ThemeProvider as ThemeProviderStyled } from 'styled-components';

import theme from '@/styles/theme';
import themeStyled from '@/styles/themeStyled';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  hydrate,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

import NextAuthSessionProvider from '@/providers/sessionProvider';
import Base from '@/templates/Base';

type ThemeProviderPageProps = {
  children: ReactNode;
};

export default function ThemeProviderPage({
  children,
}: ThemeProviderPageProps) {
  const queryClientRef = new QueryClient();

  return (
    <NextAuthSessionProvider>
      <QueryClientProvider client={queryClientRef}>
        <HydrationBoundary state={hydrate}>
          <ThemeProvider theme={theme}>
            <ThemeProviderStyled theme={themeStyled}>
              <Base>{children}</Base>
            </ThemeProviderStyled>
          </ThemeProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </NextAuthSessionProvider>
  );
}
