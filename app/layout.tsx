import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";

import "./globals.css";
import { textFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

type RootLayoutProps = { children: React.ReactNode };

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={textFont.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
