'use client';

import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {hideBackButton} from "@/shared/BackButton";
import {UserContext} from "@/app/Auth";
import {Loading} from "@/shared/Loading";
import Image from "next/image";
import {useBalance} from "@/app/balance/useBalance";
import {useLastOrders} from "@/app/orders/useLastOrders";

export default function Home() {

  const { user, userLoading}  = useContext(UserContext)
  const [balance, balanceLoading] = useBalance()

  const lastOrders = useLastOrders()

  useEffect(() => {
    hideBackButton()
  },[])

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

      <div className="rounded-2xl w-full p-3 mr-2" style={{backgroundImage: "url(/images/balance-bg.webp)", backgroundSize: 'cover' }}>
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

      <div className="w-full flex gap-1 mt-5 mr-2">
        <Link className="w-6/12" href="/drops">
          <div className="rounded-2xl p-3 bg-color-2">
            <span className="text-white">Готовые клады</span>
            <div className="text-right"> &gt; </div>
          </div>
        </Link>
        <Link className="w-6/12" href="/inpost">
          <div className="rounded-2xl p-3 bg-color-2">
            <span className="text-white">Заказать Inpost</span>
            <div className="text-right"> &gt; </div>
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
              height={ 24 }
            /> Мои покупки
          </div>
          <div>
            <Link href="/orders">Больше &nbsp;&nbsp; &gt;</Link>
          </div>
        </div>
        <div className="p-2 flex overflow-auto gap-1">
          {lastOrders.length ? lastOrders?.map((order) =>
            <div key={order.id} className="w-5/12 flex-none rounded-xl bg-green-900 p-2 text-center" style={{backgroundColor: "#161C26"}}>
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
