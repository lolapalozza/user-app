'use client'

import {useContext, useEffect, useMemo, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {QuantityCounter} from "@/shared/QuantityCounter";
import {CartContext} from "@/app/cartContext";
import {NavigationBack} from "@/shared/NavigationBack";
import {formatOrderString} from "@/app/inpost/utils/formatOrderString";

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

  const createInpost = (e) => {
    e.preventDefault();
    const email = e.target.form.email.value;
    const phone = e.target.form.phone.value;
    const city = e.target.form.city.value;
    const pachkomat = e.target.form.pachkomat.value

    const orderString = formatOrderString(cart.cartItems, products)

    const order = {
      email, phone, city, pachkomat, order: orderString
    }

    console.log(order)

  }

  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <NavigationBack linkTo="/inpost" />

      <h2 className="mb-10">
        Cart
      </h2>

      <div className="p-4 mb-2">
        {totalPrice > 0 ? <ul>
          {Object.entries(cart.cartItems).map(([_id, quantity]) =>
            <li key={_id} className="flex gap-10 items-center mb-2">
              <div className="min-w-24">{products.find(({id}) => id === _id)?.short_description}</div>
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
        </ul> : <h2>
          Cart is Empty
        </h2>}

        <div className="mt-20">
          {totalPrice > 0 && <>Total Price: {totalPrice}</>}
        </div>
      </div>

      {totalPrice > 0 && <>
        <hr className="color-white w-full mb-5"/>
        <h2>
          Enter your data
        </h2>
        <div className="p-4">
          <form className="text-center">
            <input className="w-full h-9 mb-2 p-1 rounded text-black" name="email" placeholder="Email"/>
            <input className="w-full h-9 mb-2 p-1 rounded text-black" name="phone" placeholder="Phone Number"/>
            <input className="w-full h-9 mb-2 p-1 rounded text-black" name="city" placeholder="City"/>
            <input className="w-full h-9 mb-2 p-1 rounded text-black" name="pachkomat" placeholder="Pachkomat #"/>

            <button className="border-2 p-2 color-white rounded" onClick={createInpost}>
              Place Order
            </button>

          </form>
        </div>
      </>}

    </main>
  );
}
