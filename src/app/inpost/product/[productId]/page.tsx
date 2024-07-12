'use client'

import {useEffect, useMemo, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {useRouter} from "next/navigation";

export default function ProductPage({params}) {

  const router = useRouter()
  const [products, setProducts] = useState([])

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
        <span onClick={goBack}>Back</span>
        <img alt={product.short_description} src={product.photo_urls}
             className="cursor-pointer"/>
        {<p>PRODUCT {product.short_description}</p>}
      </>}

    </div>
  );
}
