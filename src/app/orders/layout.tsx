'use client'

import Link from "next/link";
import {NavigationBack} from "@/shared/NavigationBack";
import {usePathname} from "next/navigation";
import classNames from "classnames";

export default function OrdersLayout({children}){

  const path = usePathname()

  const inpostButtonClasses = classNames("border-2", "p-2", {
    "bg-red-400": path.includes('inpost')
  })

  const dropsButtonClasses = classNames("border-2", "p-2", {
    "bg-red-400": path.includes('drops')
  })

  return <main className="flex min-h-screen flex-col items-center relative">
    <NavigationBack/>
    <h1 className="mb-5">Orders</h1>
    <div className="flex gap-2 mb-5">
      <Link href="/orders/inpost" className="flex flex-col items-center">
        <button className={inpostButtonClasses}>
          InPost
        </button>
      </Link>
      <Link href="/orders/drops" className="flex flex-col items-center">
        <button className={dropsButtonClasses}>
          Drops
        </button>
      </Link>
    </div>
    {children}
  </main>
}
