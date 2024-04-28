'use client';
import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>

        <Navbar setIsExpanded={setIsExpanded}/>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
