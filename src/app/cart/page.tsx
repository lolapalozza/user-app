'use client'

import {useContext, useEffect, useMemo, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {QuantityCounter} from "@/shared/QuantityCounter";
import {CartContext} from "@/app/cartContext";
import Link from "next/link";

export default function Cart() {

  const [products, setProducts] = useState([])

  const { cart } = useContext(CartContext);

  useEffect(() => {
    getProducts().then((_products) => setProducts(_products))
  }, [])

  const totalPrice = useMemo(() => {
    return Object.entries(cart.cartItems)
      .map(([_id, quantity]) => products.find(product => product.id === _id)?.price * quantity)
      .reduce((acc, cur) => acc + cur, 0)
  }, [products, cart.cartItems])

  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative">

      <div className="absolute left-0 ml-20">
        <span>
          <Link href="/inpost">Back to InPost</Link>
        </span>
      </div>

      <h1 className="mb-40">
        Cart
      </h1>
      <div>
        <ul>
          {Object.entries(cart.cartItems).map(([_id, quantity]) =>
            <li key={_id} className="flex gap-20">
              <div className="min-w-32">{products.find(({id}) => id === _id)?.short_description}</div>
              <QuantityCounter
                quantity={quantity}
                setQuantity={
                  (value) => {
                    let _cartItems = {
                      ...cart.cartItems,
                      [_id]: value
                    }
                    cart.setCartItems(_cartItems)
                  }
                }
              />
              Price: {products.find(({id}) => id === _id)?.price * quantity}
            </li>
          )}
        </ul>
        <div className="mt-20">
          Total Price: {totalPrice}
        </div>
      </div>
    </main>
  );
}
