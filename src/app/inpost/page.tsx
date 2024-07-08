'use client'

import {useEffect, useMemo, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {ProductView} from "@/app/inpost/productView";

export default function Products() {
  const [products, setProducts] = useState([])
  const [quantity, setQuantity] = useState({})

  useEffect(() => {
     getProducts().then((_products) => setProducts(_products))
  }, [])

  const cartQuantity = useMemo(() => {
    return Object.values(quantity).filter(value => value > 0).length
  }, [quantity])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <h1 className="mb-40">
        Collect Products and Create Order
      </h1>

      <div className="absolute right-0 mr-20">
        <span>
          Cart ({cartQuantity})
        </span>
      </div>

      <ul className="flex flex-wrap">
        {products.map((product) =>
          <ProductView key={product.id} product={product} quantity={quantity} setQuantity={setQuantity} />
        )}
      </ul>

    </main>
  );
}
