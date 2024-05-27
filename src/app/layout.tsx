import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css';
import Loading from './loading';
import ThemeProviderPage from './theme-provider';

const poppins = Poppins({ subsets: ['latin'], weight: '500' });

export const metadata: Metadata = {
  title: process.env.customKey,
  description: 'Generated by Tiago Persch',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <Suspense fallback={<Loading />}>
          <ThemeProviderPage>
            {children}
            <ToastContainer />
          </ThemeProviderPage>
        </Suspense>
      </body>
    </html>
  );
}
