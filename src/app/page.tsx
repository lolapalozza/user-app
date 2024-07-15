'use client';

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import Script from "next/script";

export default function Home() {

  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [tg, setTg] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      if(window.Telegram){
        const a = JSON.stringify(window.Telegram.WebApp)
        setTg(a)
        clearInterval(interval)
      }
    }, 5000)

  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <Script src="https://telegram.org/js/telegram-web-app.js"/>

      {tg}

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
