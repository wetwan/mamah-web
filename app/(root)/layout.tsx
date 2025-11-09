/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
// @ts-ignore: CSS import types are not declared in this project
import "./globals.css";

import AppLayOut from "@/components/appLayOut";

const geistSans = Poppins({
  subsets: ["latin"],
  weight: "300",
});

const geistMono = Roboto({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UAM CLOSETS",
  description: "WHEN ELEGANCE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
      >
        <AppLayOut>{children}</AppLayOut>
      </body>
    </html>
  );
}
