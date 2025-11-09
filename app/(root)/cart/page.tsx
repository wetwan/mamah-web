// /(root)/cart/page.tsx

// Import Suspense from React, as this file is likely a Server Component
import React, { Suspense } from "react"; 

import CartPage from "@/components/cartPage"; 
// You may remove the unnecessary `"use client";` from this file 
// if it's only importing and rendering CartPage inside Suspense.

const Cart = () => {
  return (
    // Wrap the client component (CartPage) in a Suspense boundary.
    // This tells Next.js's server renderer to skip this part and stream 
    // the fallback until the client can hydrate and run client-side hooks.
    <Suspense fallback={<div>Loading your cart...</div>}>
      <CartPage />
    </Suspense>
  );
};

export default Cart;