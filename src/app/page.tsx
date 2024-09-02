'use client';

import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {hideBackButton} from "@/shared/BackButton";
import {UserContext} from "@/app/Auth";
import {Loading} from "@/shared/Loading";
import Image from "next/image";
import {useBalance} from "@/app/balance/useBalance";

export default function Home() {

  const { user, userLoading}  = useContext(UserContext)
  const [balance, balanceLoading] = useBalance()

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

      <div className="rounded-2xl w-full p-3 mr-2" style={{backgroundColor: "#08132A"}}>
        <div className="flex justify-between">
          <div className="flex gap-1 items-start">
            <Image
              src="/icons/icon-coins.png"
              className="dark:invert inline-block mb-5"
              width={24}
              height={24}
            /> Мой Баланс
          </div>
          <div>
            <Link href="/balance">Больше ></Link>
          </div>
        </div>
        <div className="mt-5 text-3xl">
          {balanceLoading ? <Loading/> : <>{balance} PLN</>}
        </div>
      </div>

      <div className="w-full flex gap-1 mt-5 mr-2">
        <div className="rounded-2xl w-6/12 p-3" style={{backgroundColor: "#171D29E5"}}>
          Готовые клады
          <div className="text-right"><Link href="/drops"> > </Link></div>
        </div>
        <div className="rounded-2xl w-6/12 p-3 bg-amber-700" style={{backgroundColor: "#171D29E5"}}>
          Заказать Inpost
          <div className="text-right"><Link href="/inpost"> > </Link></div>
        </div>
      </div>

      <div className="w-full bg-blue-500 flex-col rounded-2xl flex gap-1 mt-5 mr-2">
        <div className="flex w-full p-3 justify-between">
          <div className="flex gap-1 items-start">
            <Image
              src="/icons/icon-orders.png"
              className="dark:invert inline-block mb-5"
              width={24}
              height={24}
            /> Мои покупки
          </div>
          <div>
            <Link href="/orders">Больше ></Link>
          </div>
        </div>
        <div className="p-2 flex gap-1">
          <div className="w-5/12 rounded-xl bg-green-900 p-2 text-center" style={{backgroundColor: "#161C26"}}>
            <div>No man's sky</div>
            <div>action game</div>
            <div>$50</div>
          </div>
          <div className="w-5/12 rounded-xl bg-green-900 p-2 text-center" style={{backgroundColor: "#161C26"}}>
            <div>No man's sky</div>
            <div>action game</div>
            <div>$50</div>
          </div>
        </div>
      </div>

      <div className="main-page-header w-full flex flex-col justify-center pt-20 pb-20">
        {/*<div className="ml-5 mt-5 self-start w-8 text-4xl max-w-30 text-black border-spacing-2"></div>*/}
      </div>

      {/*<div className="w-full flex justify-center items-center pt-10 pb-10 pl-1 pr-1">*/}
      {/*  <ul className="flex w-full gap-8 justify-center">*/}
      {/*    <li className="flex flex-col items-center text-center">*/}
      {/*      <Link href="/balance" className="flex flex-col items-center">*/}
      {/*        <button>*/}
      {/*          <span>Пополнить Баланс</span>*/}
      {/*        </button>*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*    <li className="flex flex-col items-center text-center">*/}
      {/*      <Link href="/shop" className="flex flex-col items-center">*/}
      {/*        <button>*/}
      {/*          <span>В Магазин </span>*/}
      {/*        </button>*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*    <li className="flex flex-col items-center text-center">*/}
      {/*      <Link href="/orders" className="flex flex-col items-center">*/}
      {/*        <button>*/}
      {/*          <span>Просмотр Покупок</span>*/}
      {/*        </button>*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </main>
  );
}
