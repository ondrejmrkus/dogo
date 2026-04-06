import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Dogo — sledování chovatelů",
  description: "Minimalistická appka pro hledání štěněte border kolie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-stone-50 font-[family-name:var(--font-geist)] text-stone-900">
        {children}
      </body>
    </html>
  );
}
