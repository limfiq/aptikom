'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <>
      <ToastProvider />
      {!isAdminPage && <Navbar />}
      <main className={isAdminPage ? "" : "flex-grow bg-gray-50"}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </>
  );
}
