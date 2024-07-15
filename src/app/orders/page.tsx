'use client'

import Link from "next/link";
import {NavigationBack} from "@/shared/NavigationBack";

export default function Orders() {

  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <NavigationBack />

      <h1 className="mb-40">
        Orders
      </h1>

    </main>
  );
}
