'use client'

import {useContext, useEffect, useMemo, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {useRouter} from "next/navigation";
import {NavigationBack} from "@/shared/NavigationBack";
import {QuantityCounter} from "@/app/inpost/QuantityCounter";
import {CartContext} from "@/app/inpost/cartContext";

export default function ProductPage({params}) {

  const router = useRouter()
  const [products, setProducts] = useState([])

  const { cart } = useContext(CartContext);

  console.log(cart)

  const goBack = () => {
    router.push("/inpost")
  }

  useEffect(() => {
    getProducts().then((_products) => setProducts(_products))
  }, [])

  const product = useMemo(() => {
    return products.find(product => product.id === params.productId)
  }, [products, params.productId])

  return (<div>
      {product && <>
        <NavigationBack linkTo="/inpost" />
        <div className="flex text-center justify-center flex-col items-center	">
          <h2 className="text-center mb-2">
            {product.short_description} - {product.price} PLN
          </h2>
          <img alt={product.short_description} src={product.photo_urls}
               className="mb-2 max-w-96"/>
          <p className="mb-2">
            {product.long_description}
          </p>
          <QuantityCounter
              quantity={cart.cartItems[product.id]}
              setQuantity={
                (value) => {
                  let _quantity = {
                    ...cart.cartItems,
                    [product.id]: value
                  }
                  cart.setCartItems(_quantity)
                }
              }
            measure={product.measure}
          />
        </div>
      </>}
    </div>
  );
}
