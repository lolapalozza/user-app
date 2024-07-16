'use client';

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import Script from "next/script";
import {http} from "@/utils/httpClient";

export default function Home() {

  const [userId, setUserId] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      if(window.Telegram && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user){
        const _userId = JSON.stringify(window.Telegram.WebApp.initDataUnsafe.user.id)
        setUserId(_userId)
        window.Telegram.WebApp.ready()
        clearInterval(interval)
        http.setHeaders("user_id", _userId)
      }
    }, 1000)

  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {/*<div className="ml-5 mt-5 self-start w-8 text-4xl"></div>*/}

      <Script src="https://telegram.org/js/telegram-web-app.js" />

      {userId}

      <ul className="flex gap-10">
        <li className="flex flex-col items-center">
          <Image
            src="/icons/envelope.png"
            className="dark:invert"
            width={48}
            height={48}
          />
          <Link href="/inpost">InPost</Link>
        </li>
        <li className="flex flex-col items-center">
          <Image
            src="/icons/drop.png"
            className="dark:invert"
            width={48}
            height={48}
          />
          <Link href="/drops">Drops</Link>
        </li>
        <li className="flex flex-col items-center">
          <Image
            src="/icons/balance.png"
            className="dark:invert"
            width={48}
            height={48}
          />
          <Link href="/balance">Balance</Link>
        </li>
        <li className="flex flex-col items-center">
          <Image
            src="/icons/orders.png"
            className="dark:invert"
            width={48}
            height={48}
          />
          <Link href="/orders">Orders</Link>
        </li>
      </ul>
    </main>
  );
}
