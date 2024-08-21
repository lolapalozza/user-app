'use client';

import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {hideBackButton} from "@/shared/BackButton";
import {UserContext} from "@/app/Auth";
import {Loading} from "@/shared/Loading";

export default function Home() {

  const [headerColor, setHeaderColor] = useState("#333")
  const [backgroundColor, setBackgroundColor] = useState("#000")

  const { user, userLoading }  = useContext(UserContext)

  useEffect(() => {
    hideBackButton()
  },[])

  useEffect(() => {
    setHeaderColor(window?.Telegram?.WebApp?.headerColor)
    setBackgroundColor(window?.Telegram?.WebApp?.backgroundColor)
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center pl-4 pr-4">
      <div style={{backgroundColor: headerColor}} className="w-full flex flex-col justify-center p-20">
        {/*<div className="ml-5 mt-5 self-start w-8 text-4xl max-w-30 text-black border-spacing-2"></div>*/}
        {
          userLoading ? <div className="mb-5"><Loading/></div> : <>
            {user.full_name && <div className="w-full text-center">
              <div className="mb-10 text-3xl">Привет, {user.full_name}</div>
            </div>}
          </>
        }

        {headerColor}
        {backgroundColor}

        <div className="mb-10 text-2xl text-center">Добро пожаловать в Магазин</div>
      </div>

      <div style={{backgroundColor: backgroundColor}} className="w-full flex justify-center items-center p-10">
        <ul className="flex gap-10">
          <li className="flex flex-col items-center text-center">
            <Link href="/balance" className="flex flex-col items-center">
              {/*<Image*/}
              {/*  src="/icons/icon-money.png"*/}
              {/*  className="dark:invert mb-2"*/}
              {/*  width={48}*/}
              {/*  height={48}*/}
              {/*/>*/}
              <button className="border-2 p-2 rounded text-white">
                <span>Пополнить Баланс</span>
              </button>
            </Link>
          </li>
          <li className="flex flex-col items-center text-center">
            <Link href="/shop" className="flex flex-col items-center">
              {/*<Image*/}
              {/*  src="/icons/icon-scales.png"*/}
              {/*  className="dark:invert mb-2"*/}
              {/*  width={48}*/}
              {/*  height={48}*/}
              {/*/>*/}
              <button className="border-2 p-2 rounded text-white">
                <span>В Магазин</span>
              </button>
            </Link>
          </li>
          {/*<li className="flex flex-col items-center text-center">*/}
          {/*  <Link href="/inpost" className="flex flex-col items-center">*/}
          {/*    <Image*/}
          {/*      src="/icons/envelope.png"*/}
          {/*      className="dark:invert"*/}
          {/*      width={48}*/}
          {/*      height={48}*/}
          {/*    />*/}
          {/*    <span>InPost</span>*/}
          {/*  </Link>*/}
          {/*</li>*/}
          {/*<li className="flex flex-col items-center text-center">*/}
          {/*  <Link href="/drops" className="flex flex-col items-center">*/}
          {/*    <Image*/}
          {/*      src="/icons/drop.png"*/}
          {/*      className="dark:invert"*/}
          {/*      width={48}*/}
          {/*      height={48}*/}
          {/*    />*/}
          {/*    <span>Drops</span>*/}
          {/*  </Link>*/}
          {/*</li>*/}
          <li className="flex flex-col items-center text-center">
            <Link href="/orders" className="flex flex-col items-center">
              {/*<Image*/}
              {/*  src="/icons/icon-orders.png"*/}
              {/*  className="dark:invert mb-2"*/}
              {/*  width={48}*/}
              {/*  height={48}*/}
              {/*/>*/}
              <button className="border-2 p-2 rounded text-white">
                <span>Просмотр Покупок</span>
              </button>
            </Link>
          </li>
        </ul>
      </div>


    </main>
  );
}
