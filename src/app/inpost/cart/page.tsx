'use client'

import {useContext, useEffect, useMemo, useState} from "react";
import {createInpostOrder, getProducts} from "@/app/inpost/api";
import {QuantityCounter} from "@/app/inpost/QuantityCounter";
import {CartContext} from "@/app/inpost/cartContext";
import {NavigationBack} from "@/shared/NavigationBack";
import {formatToOrderDTO} from "@/app/inpost/utils/formatToOrderDTO";
import {AddressForm} from "@/app/inpost/cart/addressForm";

export default function Cart() {

  const [products, setProducts] = useState([])
  const [orderSuccess, setOrderSuccess] = useState(false)

  const { cart } = useContext(CartContext);

  useEffect(() => {
    getProducts().then((_products) => setProducts(_products))
  }, [])

  const totalPrice = useMemo(() => {
    return Object.entries(cart.cartItems)
      .map(([_id, quantity]) => products.find(product => product.id === _id)?.price * quantity)
      .reduce((acc, cur) => acc + cur, 0)
  }, [products, cart.cartItems])

  const createInpost = async({email, phone, pachkomat}) => {
    const order = formatToOrderDTO(cart.cartItems)

    const result = await createInpostOrder({
      userId: 1, price: totalPrice, email, phone, pachkomat, order
    })

    if(result.success){

      cart.setCartItems({})

      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false)
      }, 4000)
    }

  }

  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <NavigationBack linkTo="/inpost" />

      <h2 className="mb-10">
        Cart
      </h2>

      <div className="p-4 mb-2">
        {totalPrice > 0 ? <ul>
          {Object.entries(cart.cartItems).map(([_id, quantity]) => {
            const product = products.find(({id}) => id === _id)
              return <li key={_id} className="flex gap-10 items-center mb-2">
                <div className="min-w-24">{product?.short_description}</div>
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
                  product={product}
                />
                Price: {product?.price * quantity}
              </li>
            }
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
        <AddressForm createInpost={createInpost} />
      </>}

      {
        orderSuccess && <div>
            Order Created Successfully!
          </div>
      }

    </main>
  );
}
