import { Geist, Geist_Mono } from "next/font/google";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
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
  metadataBase: new URL("https://aptikom.org"),
  title: "APTIKOM - Asosiasi Pendidikan Tinggi Informatika dan Komputer",
  description: "Asosiasi Pendidikan Tinggi Informatika dan Komputer (APTIKOM) adalah organisasi yang beranggotakan perguruan tinggi dengan program studi informatika dan komputer di Indonesia.",
  openGraph: {
    title: "APTIKOM - Asosiasi Pendidikan Tinggi Informatika dan Komputer",
    description: "Organisasi nirlaba yang memfasilitasi kolaborasi, peningkatan kualitas, dan pengembangan profesional bagi institusi dan dosen informatika di seluruh Indonesia.",
    url: "https://aptikom.org",
    siteName: "APTIKOM",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo APTIKOM",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APTIKOM - Asosiasi Pendidikan Tinggi Informatika dan Komputer",
    description: "Organisasi nirlaba yang memfasilitasi kolaborasi, peningkatan kualitas, dan pengembangan profesional bagi institusi dan dosen informatika di seluruh Indonesia.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
        suppressHydrationWarning
      >
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
