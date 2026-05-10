import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";

import { Footer, Navbar } from "@/components/shared";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tienda UCN",
  description: "Plataforma de compras de la Universidad Católica del Norte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${geistMono.variable} flex min-h-screen flex-col bg-slate-50 font-sans antialiased`}
      >
        <Navbar />
        <main className="container mx-auto flex-grow px-4 py-8">{children}</main>
        <Footer />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
