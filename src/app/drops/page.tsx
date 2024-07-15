'use client'

import Link from "next/link";
import {DropSelector, STEP} from "@/app/drops/DropSelector";
import {useState} from "react";
import {Payment} from "@/app/drops/Payment";
import {NavigationBack} from "@/shared/NavigationBack";
import {BreadCrumbs} from "@/app/drops/BreadCrumbs";

export default function Drops() {
  const [selection, setSelection] = useState({
    step: STEP.CITY,
    city: undefined,
    district: undefined,
    amount: undefined,
    unit: undefined,
    price: undefined,
    productId: undefined,
    productTitle: undefined,
    dropId: undefined,
    drop: undefined
  })
  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <NavigationBack />

      <h1 className="mb-5">
        Drops
      </h1>

      <BreadCrumbs selection={selection} setSelection={setSelection} />

      <div className="p-5 w-full">
        {selection.drop ? <Payment selection={selection} /> : <DropSelector selection={selection} setSelection={setSelection} />}
      </div>

    </main>
  );
}
