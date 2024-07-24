'use client'

import {NavigationBack} from "@/shared/NavigationBack";
import Link from "next/link";

export default function Orders() {

  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <NavigationBack />

      <h1 className="mb-5">Orders</h1>

      <div className="flex gap-2">
        <Link href="/orders/inpost" className="flex flex-col items-center">
          <button className="border-2 p-2">
            InPost
          </button>
        </Link>
        <Link href="/orders/drops" className="flex flex-col items-center">
          <button className="border-2 p-2">
            Drops
          </button>
        </Link>
      </div>

    </main>
  );
}
