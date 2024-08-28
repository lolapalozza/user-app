'use client';

import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {hideBackButton} from "@/shared/BackButton";
import {UserContext} from "@/app/Auth";
import {Loading} from "@/shared/Loading";

export default function Home() {

  const { user, userLoading}  = useContext(UserContext)

  useEffect(() => {
    hideBackButton()
  },[])

  const sss = () => {
    window.Telegram.WebApp.sendData("orderData");
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="main-page-header w-full flex flex-col justify-center pt-20 pb-20">
        {/*<div className="ml-5 mt-5 self-start w-8 text-4xl max-w-30 text-black border-spacing-2"></div>*/}

        {
          userLoading ? <div className="mb-5 text-center"><Loading/></div> : <>
            {user.full_name && <div className="w-full text-center">
              <div className="mb-10 text-3xl">Привет, {user.full_name}</div>
            </div>}
          </>
        }
        <div className="mb-10 text-2xl text-center">Добро пожаловать в Магазин</div>
      </div>

      <div className="w-full flex justify-center items-center pt-10 pb-10 pl-1 pr-1">
        <ul className="flex w-full gap-8 justify-center">
          <li className="flex flex-col items-center text-center">
            <Link href="/balance" className="flex flex-col items-center">
              <button>
                <span>Пополнить Баланс</span>
              </button>
            </Link>
          </li>
          <li className="flex flex-col items-center text-center">
            <Link href="/shop" className="flex flex-col items-center">
              <button>
                <span>В Магазин </span>
              </button>
            </Link>
          </li>
          <li className="flex flex-col items-center text-center">
            <Link href="/orders" className="flex flex-col items-center">
              <button>
                <span>Просмотр Покупок</span>
              </button>
            </Link>
          </li>
          <li>
            <button onClick={sss}>
              sendmsg
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
}
