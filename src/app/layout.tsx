import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google"; 
import "./globals.css";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Toaster } from 'sonner';

// 2. Configuramos Montserrat
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
        className={`${montserrat.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen bg-slate-50`}
      >
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}