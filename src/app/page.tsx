'use client';

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import Script from "next/script";
import {authorization} from "@/app/authorization";
import {hideBackButton} from "@/shared/BackButton";

export default function Home() {

  const [auth, setAuth] = useState("")

  useEffect(() => { //@todo put authorization in other place
    authorization.init().then(({result, tg_query}) => {
      setAuth(tg_query)
    }).catch(() => {
      setAuth("not Auth")
    })

    hideBackButton()

  },[])

  return (
    <main className="flex min-h-screen flex-col  items-center justify-between p-24">

      {/*<div className="ml-5 mt-5 self-start w-8 text-4xl max-w-30 text-black border-spacing-2"></div>*/}

      <Script src="https://telegram.org/js/telegram-web-app.js" />

      <ul className="flex gap-10">
        <li className="flex flex-col items-center">
          <Link href="/inpost" className="flex flex-col items-center">
            <Image
              src="/icons/envelope.png"
              className="dark:invert"
              width={48}
              height={48}
            />
            <span>InPost</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/drops" className="flex flex-col items-center">
            <Image
              src="/icons/drop.png"
              className="dark:invert"
              width={48}
              height={48}
            />
            <span>Drops</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/balance" className="flex flex-col items-center">
            <Image
              src="/icons/balance.png"
              className="dark:invert"
              width={48}
              height={48}
            />
            <span>Balance</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/orders" className="flex flex-col items-center">
            <Image
              src="/icons/orders.png"
              className="dark:invert"
              width={48}
              height={48}
            />
            <span>Orders</span>
            </Link>
        </li>
      </ul>
    </main>
  );
}
