'use client'

import {useContext, useEffect, useMemo, useState} from "react";
import {createInpostOrder, getProducts} from "@/app/inpost/api";
import {QuantityCounter} from "@/app/inpost/QuantityCounter";
import {CartContext} from "@/app/inpost/cartContext";
import {BackButton} from "@/shared/BackButton";
import {formatToOrderDTO} from "@/app/inpost/utils/formatToOrderDTO";
import {AddressForm} from "@/app/inpost/cart/addressForm";
import {getBalance} from "@/app/balance/api";
import Link from "next/link";
import classNames from "classnames";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Loading} from "@/shared/Loading";

const DELIVERY_PRICE = 40
const FREE_DELIVERY_TRESHOLD = 700

export default function Cart() {

  const [products, setProducts] = useState([])
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [balance, setBalance] = useState(0)
  const [cartLoading, setCartLoading] = useState(false)


  const { cart } = useContext(CartContext);
  const router = useRouter()

  useEffect(() => {
    setCartLoading(true)

    const balancePromise = getBalance().then((_balance) => {
      setBalance(_balance.balance)
    })
    const productsPromise = getProducts().then((_products) => setProducts(_products))

    Promise.all([balancePromise, productsPromise]).then(() => {
      setCartLoading(false)
    })

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
      router.push("/orders/inpost")
    }

    return result
  }

  return (
    <main className="flex min-h-screen mt-10 flex-col items-center relative">
      <BackButton linkTo="/inpost" />

      <h2 className="mb-10">
        Корзина
      </h2>

      {
        cartLoading ? <Loading/> : <div className="p-4 w-full">
          {productsPrice > 0 ? <div className="rounded-3xl bg-color p-5">
            <ul className="flex gap-5 flex-col">
              {Object.entries(cart.cartItems).map(([_id, quantity]) => {
                  const product = products.find(({id}) => id === _id)
                  return <li key={_id} className="flex gap-6 items-start mb-2">
                    <div className="min-w-24">
                      <img className="mb-2 max-w-24"
                           src={`${process.env.NEXT_PUBLIC_API_URL}/products_photo/${product.photo_urls}`}/>
                    </div>
                    <div className="flex-1">
                      <div className="min-w-24 w-1/3">{product?.short_description}</div>
                      <div className="w-1/3">{product?.price * quantity} PLN</div>
                      <QuantityCounter
                        className="w-36"
                        quantity={quantity}
                        setQuantity={(value) => {
                          let _cartItems;

                          if (value === 0) {
                            // Remove the property if the value is 0
                            const {[_id]: _, ...rest} = cart.cartItems;
                            _cartItems = rest;
                          } else {
                            // Set the new value otherwise
                            _cartItems = {
                              ...cart.cartItems,
                              [_id]: value,
                            };
                          }

                          cart.setCartItems(_cartItems);
                        }}
                        product={product}
                      />
                    </div>
                    {/*<div>*/}
                    {/*  Delete*/}
                    {/*</div>*/}
                  </li>
                }
              )}
            </ul>
            <div className="text-right mt-5">Сумма заказа: {productsPrice} PLN</div>
          </div> : <div className="text-center">
            <Image
              src="/icons/icon-empty.png"
              className="dark:invert inline-block mb-5"
              width={64}
              height={64}
            />
            <h2>Корзина пуста</h2>
          </div>}

          {productsPrice > 0 && <>
            <hr className="color-white w-full mt-5"/>
            <div className="mt-5 flex gap-2 flex-col">

            <span>
              Доставка: {deliveryPrice} PLN <span className="text-xs">(бесплатно от 700 PLN)</span>
            </span>

              <span>Итого: {productsPrice + deliveryPrice} PLN</span>
              <span className={balanceClass}>Ваш Баланс: {balance} PLN</span>
              {
                balance < totalPrice &&
                  <span
                      className="text-sm">У вас недостаточно средств. Пополните <Link
                      className="text-blue-300" href="/balance">баланс</Link></span>
              }
            </div>
          </>}

        </div>
      }

      {(productsPrice > 0 && balance >= totalPrice) && <>
        <div className="p-4 w-full">
          <hr className="color-white w-full"/>
        </div>
        <AddressForm createInpost={createInpost}/>
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
