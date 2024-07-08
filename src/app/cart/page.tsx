'use client'

import {useEffect, useMemo, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {QuantityCounter} from "@/shared/QuantityCounter";

export default function Cart() {

  const [cartItems, setCartItems] = useState({"2": 3, "10": 4, "20": 6})
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then((_products) => setProducts(_products))
  }, [])

  const totalPrice = useMemo(() => {
    return Object.entries(cartItems)
      .map(([_id, quantity]) => products.find(product => product.id === _id)?.price * quantity)
      .reduce((acc, cur) => acc + cur)
  }, [products, cartItems])

  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative">
      <h1 className="mb-40">
        Cart
      </h1>
      <div>
        <ul>
          {Object.entries(cartItems).map(([_id, quantity]) =>
            <li key={_id} className="flex gap-20">
              <div className="min-w-32">{products.find(({id}) => id === _id)?.short_description}</div>
              <QuantityCounter
                quantity={quantity}
                setQuantity={
                  (value) => {
                    let _cartItems = {
                      ...cartItems,
                      [_id]: value
                    }
                    setCartItems(_cartItems)
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
