'use client'

import {useContext, useEffect, useMemo, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {ProductView} from "@/app/inpost/productView";
import Link from "next/link";
import {CartContext} from "@/app/cartContext";

export default function Products() {
  const [products, setProducts] = useState([])

  const { cart } = useContext(CartContext);

  useEffect(() => {
     getProducts().then((_products) => setProducts(_products))
  }, [])

  const cartQuantity = useMemo(() => {
    return Object.values(cart.cartItems).filter(value => value > 0).length
  }, [cart.cartItems])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">

      <div className="absolute left-0 ml-20">
        <span>
          <Link href="/">Back Home</Link>
        </span>
      </div>

      <h1 className="mb-40">
        Collect Products and Create Order
      </h1>

      <div className="absolute right-0 mr-20">
        <span>
          <Link href="/cart">Cart ({cartQuantity})</Link>
        </span>
      </div>

      {/*<input type="text" className="w-8 text-center text-black bg-transparent text-2xl text-5xl" />*/}


      <ul className="flex flex-wrap">
        {products.map((product) =>
          <ProductView
            key={product.id}
            product={product}
            quantity={cart.cartItems}
            setQuantity={cart.setCartItems}/>
        )}
      </ul>

    </main>
  );
}
