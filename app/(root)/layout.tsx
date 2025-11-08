import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Providers } from "@/components/providers";
import ToastProvider from "@/components/ToastProvider";

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
        <ToastProvider>
          <Providers>
            <Nav />
            {children}
            <Footer />
          </Providers>
        </ToastProvider>
      </body>
    </html>
  );
}
