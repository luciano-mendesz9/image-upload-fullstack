import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "UPLOAD IMAGES",
  description: "Site de upload de imagens by @luciano_mendesz9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen w-screen">
      <body
        className={`${poppins.variable} antialiased h-full w-full`}
      >
        {children}
      </body>
    </html>
  );
}
