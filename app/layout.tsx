import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "sonner";

import { ApolloWrapper } from "@lib/apollo-wrapper";
import theme from "./theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "CRM",
  description: "CRM Mario Gutiérrez Gracía",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider theme={theme}>
            <ApolloWrapper>{children}</ApolloWrapper>
          </ThemeProvider>
          <Toaster position="top-right" expand={true} richColors closeButton />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
