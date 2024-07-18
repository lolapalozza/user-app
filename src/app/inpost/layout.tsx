'use client'

import {Inter} from "next/font/google";
import {useMemo, useState} from "react";
import {CartContext} from "@/app/inpost/cartContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

  const [cartItems, setCartItems] = useState({})

  const cart = useMemo(() => {
    return {
      cartItems,
      setCartItems
    }
  }, [cartItems])

  return (
    <html lang="en">
      <body className={inter.className}>
        <CartContext.Provider value={{ cart }}>
          {children}
        </CartContext.Provider>
      </body>
    </html>
  );
}
