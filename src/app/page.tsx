'use client';

import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {hideBackButton} from "@/shared/BackButton";
import {UserContext} from "@/app/Auth";
import {Loading} from "@/shared/Loading";
import Image from "next/image";
import {useBalance} from "@/app/balance/useBalance";
import {useLastOrders} from "@/app/orders/useLastOrders";
import {useRouter} from "next/navigation";

export default function Home() {

  const { user, userLoading}  = useContext(UserContext)
  const [balance, balanceLoading] = useBalance([user]) // Передаем user как зависимость

  const lastOrders = useLastOrders()

  const router = useRouter()

  useEffect(() => {
    hideBackButton()
  },[])

  const navigateOrder = (order) => {
    if(order.type === "drop") { // if drop
      router.push(`/orders/drops/${order.id}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center pl-3 pt-2">

      <div className="w-full text-left">
        {
          userLoading ? <div className="mb-5"><Loading/></div> : <>
            {user.full_name && <div className="w-full">
              <div className="mb-3">Привет, {user.full_name}!</div>
            </div>}
          </>
        }
      </div>

      <div className="rounded-2xl w-full p-5 mr-2" style={{backgroundImage: "url(/images/balance-bg.webp)", backgroundSize: 'cover' }}>
        <div className="flex justify-between">
          <div className="flex gap-2 items-start">
            <Image
              src="/icons/icon-coins.png"
              className="dark:invert inline-block mb-5"
              width={24}
              height={24}
            /> Мой Баланс
          </div>
          <div>
            <Link href="/balance">Больше &nbsp;&nbsp; &gt;</Link>
          </div>
        </div>
        <div className="mt-5 text-3xl">
          {balanceLoading ? <Loading/> : <>{balance} PLN</>}
        </div>
      </div>

      <div className="w-full flex gap-2 mt-5 mr-2">
        <Link className="w-6/12" href="/drops">
          <div className="relative rounded-2xl h-44 p-5 bg-color-2">
            <span className="text-white">Готовые клады</span>
            <div className="h-full relative flex mt-5">
              <div className="border-2 rounded-xl relative z-10 bg-white flex justify-center items-center" style={{width: "55px", opacity: "30%", height: "55px", transform: 'translate(30%, 25%) rotate(-15deg)'}}>
                <Image
                  src="/icons/icon-brand.png"
                  width={42}
                  height={42}
                />
              </div>
              <div className="border-2 rounded-xl relative z-20 bg-white flex justify-center items-center" style={{width: "55px", height: "55px"}}>
                <Image
                  src="/icons/icon-pill.png"
                  width={42}
                  height={42}
                />
              </div>
              <div className="border-2 rounded-xl relative z-10 bg-white" style={{width: "55px", opacity: "30%", height: "55px", transform: 'translate(-30%, 25%) rotate(15deg)'}}>
                <Image
                  src="/icons/plant.png"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="flex bottom-2.5 right-2.5 absolute">
              <Image
                src="/icons/icon-arrow-right.svg"
                width={28}
                height={28}
              />
            </div>
          </div>
        </Link>
        <Link className="w-6/12" href="/inpost">
          <div className="relative rounded-2xl h-44 p-5 bg-color-2">
            <span className="text-white">Заказать Inpost</span>
            <div className="h-full relative flex mt-5">
              <div className="border-2 rounded-xl relative z-10 bg-white flex justify-center items-center" style={{
                width: "55px",
                opacity: "30%",
                height: "55px",
                transform: 'translate(30%, 25%) rotate(-15deg)'
              }}>
                <Image
                  src="/icons/icon-brand.png"
                  width={42}
                  height={42}
                />
              </div>
              <div className="border-2 rounded-xl relative z-20 bg-white" style={{width: "55px", height: "55px"}}>
                <Image
                  src="/icons/plant.png"
                  width={50}
                  height={50}
                />
              </div>
              <div className="border-2 rounded-xl relative z-10 bg-white flex items-center justify-center" style={{
                width: "55px",
                opacity: "30%",
                height: "55px",
                transform: 'translate(-30%, 25%) rotate(15deg)'
              }}>
                <Image
                  src="/icons/icon-pill.png"
                  width={42}
                  height={42}
                />
              </div>
            </div>
            <div className="flex bottom-2.5 right-2.5 absolute">
              <Image
                src="/icons/icon-arrow-right.svg"
                width={28}
                height={28}
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="w-full flex-col rounded-2xl flex gap-1 mt-5 mr-2">
        <div className="flex w-full p-3 justify-between">
          <div className="flex gap-1 items-start">
            <Image
              src="/icons/icon-cards.png"
              className="dark:invert inline-block mb-5"
              width={24}
              height={24}
            /> Мои покупки
          </div>
          <div>
            <Link href="/orders">Больше &nbsp;&nbsp; &gt;</Link>
          </div>
        </div>
        <div className="p-2 flex overflow-auto gap-1">
          {lastOrders.length ? lastOrders?.map((order) =>
            <div onClick={() => navigateOrder(order)} key={order.id} className="w-5/12 flex-none rounded-xl bg-green-900 p-2 text-center"
                 style={{backgroundColor: "#161C26"}}>
              <div className="flex w-full justify-center mb-4 mt-2">
                <img className="w-24 rounded-xl"
                     src={`${process.env.NEXT_PUBLIC_API_URL}/products_photo/${order.thumbs[0]}`}/>
                {order.contents}
              </div>

              <div>{order.productTitle ? order.productTitle : "Inpost Order"}</div>
              {/*<div>action game</div>*/}
              <div>{order.price ? order.price + " PLN" : "ЦЕНА"}</div>
            </div>
          ) : <div>
            Здесь будут отображаться твои покупки. Перейди в магазин, чтобы совершить первую покупку.
          </div>}
        </div>
      </div>

      <div className="main-page-header w-full flex flex-col justify-center pt-20 pb-20">
        {/*<div className="ml-5 mt-5 self-start w-8 text-4xl max-w-30 text-black border-spacing-2"></div>*/}
      </div>

    </main>
  );
}
