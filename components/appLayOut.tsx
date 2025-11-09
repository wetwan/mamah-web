"use client";

import React from "react";
import ToastProvider from "./ToastProvider";
import { Providers } from "./providers";
import Nav from "./nav";
import Footer from "./footer";

const AppLayOut = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <ToastProvider>
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </ToastProvider>
    </div>
  );
};

export default AppLayOut;
