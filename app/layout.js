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
        <meta name="description" content="Asosiasi Pendidikan Tinggi Informatika dan Komputer (APTIKOM) adalah organisasi yang beranggotakan perguruan tinggi dengan program studi informatika dan komputer di Indonesia." />
        
        {/* Open Graph Meta Tags for Social Media Sharing */}
        <meta property="og:title" content="APTIKOM - Asosiasi Pendidikan Tinggi Informatika dan Komputer" />
        <meta property="og:description" content="Organisasi nirlaba yang memfasilitasi kolaborasi, peningkatan kualitas, dan pengembangan profesional bagi institusi dan dosen informatika di seluruh Indonesia." />
        <meta property="og:image" content="https://aptikom.org/images/aptikom-og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aptikom.org" />
        <meta property="og:site_name" content="APTIKOM" />
        <meta property="og:locale" content="id_ID" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="APTIKOM - Asosiasi Pendidikan Tinggi Informatika dan Komputer" />
        <meta name="twitter:description" content="Organisasi nirlaba yang memfasilitasi kolaborasi, peningkatan kualitas, dan pengembangan profesional bagi institusi dan dosen informatika di seluruh Indonesia." />
        <meta name="twitter:image" content="https://aptikom.org/images/aptikom-og-image.jpg" />
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
