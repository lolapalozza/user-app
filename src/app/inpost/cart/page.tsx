'use client'

import {useContext, useEffect, useMemo, useState} from "react";
import {createInpostOrder, getProducts} from "@/app/inpost/api";
import {QuantityCounter} from "@/app/inpost/QuantityCounter";
import {CartContext} from "@/app/inpost/cartContext";
import {BackButton, showBackButton} from "@/shared/BackButton";
import {formatToOrderDTO} from "@/app/inpost/utils/formatToOrderDTO";
import {AddressForm} from "@/app/inpost/cart/addressForm";
import {getBalance} from "@/app/balance/api";
import Link from "next/link";
import classNames from "classnames";
import Image from "next/image";

const DELIVERY_PRICE = 40
const FREE_DELIVERY_TRESHOLD = 700

export default function Cart() {

  const [products, setProducts] = useState([])
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [balance, setBalance] = useState(0)

  const { cart } = useContext(CartContext);

  useEffect(() => {
    getBalance().then((_balance) => {
      setBalance(_balance.balance)
    })
  }, [])

  useEffect(() => {
    getProducts().then((_products) => setProducts(_products))
  }, [])

  const productsPrice = useMemo(() => {
    return Object.entries(cart.cartItems)
      .map(([_id, quantity]) => products.find(product => product.id === _id)?.price * quantity)
      .reduce((acc, cur) => acc + cur, 0)
  }, [products, cart.cartItems])

  const deliveryPrice = useMemo(() => {
    return productsPrice >= FREE_DELIVERY_TRESHOLD ? 0 : DELIVERY_PRICE
  }, [productsPrice])

  const totalPrice = useMemo(() => {
    return productsPrice + deliveryPrice
  }, [productsPrice, deliveryPrice])

  const balanceClass = classNames({
    "text-red-400": balance < totalPrice
  })

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
    <main className="flex min-h-screen mt-10 flex-col items-center relative">

      <BackButton linkTo="/inpost" />

      <h2 className="mb-10">
        Cart
      </h2>

      <div className="p-4 w-full">
        {productsPrice > 0 ? <ul>
          {Object.entries(cart.cartItems).map(([_id, quantity]) => {
              const product = products.find(({id}) => id === _id)
              return <li key={_id} className="flex items-center mb-2">
                <div className="min-w-24 w-1/3">{product?.short_description}</div>
                <QuantityCounter
                  className="w-1/3"
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
                <div className="w-1/3 text-right">{product?.price * quantity} PLN</div>
              </li>
            }
          )}

          <div className="text-right mt-5">Subtotal: {productsPrice} PLN</div>

        </ul> : <div className="text-center">
          <Image
            src="/icons/icon-empty.png"
            className="dark:invert inline-block mb-5"
            width={64}
            height={64}
          />
          <h2>Cart is Empty</h2>
        </div>}

        {productsPrice > 0 && <>
          <hr className="color-white w-full mt-5"/>
          <div className="mt-5 flex gap-2 flex-col">

            <span>
              Delivery: {deliveryPrice} PLN <span className="text-xs">(free from 700 PLN)</span>
            </span>

            <span>Total Price: {productsPrice + deliveryPrice} PLN</span>
            <span className={balanceClass}>Your Balance: {balance} PLN</span>
            {
              balance < totalPrice &&
                <span className="text-sm">You have insufficient funds to purchase this order. Please fill up your <Link
                    className="text-blue-300" href="/balance">balance</Link></span>
            }
          </div>
        </>}

      </div>

      {(totalPrice > 0 && balance >= totalPrice) && <>
        <div className="p-4 w-full">
          <hr className="color-white w-full"/>
        </div>
        <AddressForm createInpost={createInpost} />
      </>}

      {
        orderSuccess && <div>
            <Image
                src="/icons/icon-check.png"
                className="dark:invert inline-block mb-5"
                width={64}
                height={64}
            />
          Order Created Successfully!
        </div>
      }

    </main>
  );
}
