'use client';

import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Check if current path is admin page
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <title>APTIKOM - Asosiasi Pendidikan Tinggi Informatika dan Komputer</title>
        <meta name="description" content="Official website of APTIKOM organization." />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
        suppressHydrationWarning
      >
        <ToastProvider />
        {!isAdminPage && <Navbar />}
        <main className={isAdminPage ? "" : "flex-grow bg-gray-50"}>
          {children}
        </main>
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}
