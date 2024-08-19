'use client'

import Link from "next/link";
import {BackButton} from "@/shared/BackButton";
import {usePathname} from "next/navigation";
import classNames from "classnames";

export default function OrdersLayout({children}){

  const path = usePathname()

  const inpostButtonClasses = classNames("border-2", "p-2", "rounded", {
    "bg-red-400": path.includes('inpost')
  })

  const dropsButtonClasses = classNames("border-2", "p-2", "rounded", {
    "bg-red-400": path.includes('drops')
  })

  return <main className="flex min-h-screen mt-10 flex-col items-center relative">
    <BackButton/>
    <h1 className="mb-5">Ваши покупки</h1>
    <div className="flex gap-2 mb-5">
      <Link href="/orders/inpost" className="flex flex-col items-center">
        <button className={inpostButtonClasses}>
          InPost
        </button>
      </Link>
      <Link href="/orders/drops" className="flex flex-col items-center">
        <button className={dropsButtonClasses}>
          Клады
        </button>
      </Link>
    </div>
    {children}
  </main>
}
