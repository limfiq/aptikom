import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "APTIKOM - Asosiasi Pendidikan Tinggi Informatika dan Komputer",
  description: "Official website of APTIKOM organization.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
