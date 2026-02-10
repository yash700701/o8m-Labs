import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Giakaa Landing Clone | o8m Labs",
  description: "CMS-driven landing page with SEO-optimized blogs.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Giakaa Landing Clone | o8m Labs",
    description: "CMS-driven landing page with SEO-optimized blogs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
