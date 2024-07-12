'use client';

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";

export default function Home() {

  const [user, setUser] = useState("")

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    const _user = tg.initDataUnsafe.user;
    setUser(_user)
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      User: {user.id}

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
