import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LazyAddToCartPopup } from "@/features/cart/components/LazyAddToCartPopup";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MECSU Next Migration",
    template: "%s ",
  },
  description:
    "Standalone Next.js App Router migration workspace for the MECsu B2B storefront.",
  icons: {
    icon: "/mecsu_logo.png",
    shortcut: "/mecsu_logo.png",
    apple: "/mecsu_logo.png",
  },
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
        <LazyAddToCartPopup />
        <Footer />
      </body>
    </html>
  );
}
