import "@/assets/css/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/providers";
import { Footer, Header } from "@/components/common";
import axios from "axios";
import { useProductStore } from "@/hooks";
import { siteConfig } from "@/config/siteConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/favicon.png",
      href: "/favicon.png",
    },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="de" className={inter.className}>
      <body>
        <Providers>
          <Header />
          <main className="mt-40">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
