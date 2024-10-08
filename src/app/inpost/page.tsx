'use client'

import {useContext, useEffect, useMemo, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {ProductView} from "@/app/inpost/productView";
import {CartContext} from "@/app/inpost/cartContext";
import {BackButton} from "@/shared/BackButton";
import {CategoriesSelector} from "@/app/inpost/categoriesSelector";
import {CartButton} from "@/app/inpost/CartButton";
import {Loading} from "@/shared/Loading";

export default function Products() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [productsLoading, setProductsLoading] = useState(false)

  const { cart } = useContext(CartContext);

  useEffect(() => {
    setProductsLoading(true)
    getProducts().then((products) => {
      setProducts(products);
      setProductsLoading(false)
    })
  }, [])

  const cartQuantity = useMemo(() => {
    return Object.values(cart.cartItems).filter(value => value > 0).length
  }, [cart.cartItems])

  return (
    <main className="flex min-h-screen mt-10 flex-col items-center relative p-3">

      <BackButton />

      <CartButton cartQuantity={cartQuantity} />

      <CategoriesSelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {
        productsLoading ? <Loading/> : <ul className="flex gap-2 flex-wrap w-full">
          {products.filter(product => selectedCategory ? product.category_id === selectedCategory : true).map((product) =>
            <ProductView
              key={product.id}
              product={product}
              quantity={cart.cartItems}
              setQuantity={cart.setCartItems}/>
          )}
        </ul>
      }


    </main>
  );
}
