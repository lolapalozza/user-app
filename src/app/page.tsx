'use client';

import Link from "next/link";
import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import {hideBackButton} from "@/shared/BackButton";
import {UserContext} from "@/app/Auth";
import {Loading} from "@/shared/Loading";

export default function Home() {

  const { user, userLoading }  = useContext(UserContext)

  useEffect(() => {
    hideBackButton()
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">

      {/*<div className="ml-5 mt-5 self-start w-8 text-4xl max-w-30 text-black border-spacing-2"></div>*/}

      {
        userLoading ? <div className="mb-5"><Loading /></div> : <>
          {user.full_name && <div className="mb-10">Hello, {user.full_name}</div>}
        </>
      }

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
