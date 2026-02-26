import type { Metadata } from "next";

import { Plus_Jakarta_Sans, Inter } from "next/font/google";

import "./globals.css";
import Providers from "@/components/providers";
import Header from "@/components/blocks/header";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navi - Project Apotheosis",
  description: "Your own personal agentic system, part of project apotheosis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${jakarta.variable} antialiased`}>
        <Providers>
          <div className="grid grid-rows-[auto_1fr] min-h-svh">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
