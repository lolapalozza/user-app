'use client'

import {useContext, useEffect, useMemo, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {ProductView} from "@/app/inpost/productView";
import Link from "next/link";
import {CartContext} from "@/app/inpost/cartContext";
import {BackButton} from "@/shared/BackButton";
import Image from "next/image";
import {CategoriesSelector} from "@/app/inpost/categoriesSelector";
import {useRouter} from "next/navigation";

export default function Products() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { cart } = useContext(CartContext);

  useEffect(() => {
    getProducts().then((setProducts))
  }, [])

  const cartQuantity = useMemo(() => {
    return Object.values(cart.cartItems).filter(value => value > 0).length
  }, [cart.cartItems])

  useEffect(() => {
    window.Telegram.WebApp.MainButton.setText(`Cart (${cartQuantity})`);
    window.Telegram.WebApp.MainButton.onClick(() => {
      router.push("/inpost/cart")
    });
    window.Telegram.WebApp.MainButton.show();

    return () => {
      window.Telegram.WebApp.MainButton.hide();
    }

  }, [router, cartQuantity]);

  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <BackButton />

      <h1 className="mt-10 mb-10">
        Collect Products and Create Order
      </h1>

      <CategoriesSelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {/*<div className="absolute right-0 mt-3 mr-2">*/}
      {/*  <Link href="/inpost/cart" className="flex items-end">*/}
      {/*    <Image*/}
      {/*      src="/icons/icon-cart.png"*/}
      {/*      className="dark:invert"*/}
      {/*      width={32}*/}
      {/*      height={32}*/}
      {/*    />*/}
      {/*    ({cartQuantity})*/}
      {/*  </Link>*/}
      {/*</div>*/}

      <ul className="flex flex-wrap w-full">
        {products.filter(product => selectedCategory ? product.category_id === selectedCategory : true).map((product) =>
          <ProductView
            key={product.id}
            product={product}
            quantity={cart.cartItems}
            setQuantity={cart.setCartItems}/>
        )}
      </ul>

    </main>
  );
}
