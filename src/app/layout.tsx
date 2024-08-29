"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" translate="no">
      <body className={inter.className + " text-black dark:text-white bg-gray-100 dark:bg-gray-900"}>
        <AuthProvider>
          <Header/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
