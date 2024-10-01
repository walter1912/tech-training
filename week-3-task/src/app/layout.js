"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "~/components/Layout";
// I try use AppProvier in pages/_app.jsx but it doesn't match layout
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import "@shopify/polaris-tokens/css/styles.css";
import en from "@shopify/polaris/locales/en.json";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider i18n={en}>
          <StoreProvider>
            <Layout>{children}</Layout>
          </StoreProvider>
        </AppProvider>
      </body>
    </html>
  );
}
