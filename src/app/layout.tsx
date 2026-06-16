import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AddToCartPopup } from "@/features/cart";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MECsu Next Migration",
    template: "%s | MECsu",
  },
  description:
    "Standalone Next.js App Router migration workspace for the MECsu B2B storefront.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        {children}
        <AddToCartPopup />
        <Footer />
      </body>
    </html>
  );
}
