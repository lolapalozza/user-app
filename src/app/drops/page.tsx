'use client'

import {DropSelector, STEP} from "@/app/drops/DropSelector";
import {useState} from "react";
import {Payment} from "@/app/drops/Payment";
import {NavigationBack} from "@/shared/NavigationBack";
import {BreadCrumbs} from "@/app/drops/BreadCrumbs";

export const defaultSelection = () => {
  return {
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
  }
}

export default function Drops() {

  const [selection, setSelection] = useState(defaultSelection())
  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <h1 className="mb-2">
        Drops
      </h1>

      <NavigationBack />

      <BreadCrumbs selection={selection} setSelection={setSelection} />

      <div className="p-5 w-full">
        {selection.drop ? <Payment selection={selection} setSelection={setSelection} /> : <DropSelector selection={selection} setSelection={setSelection} />}
      </div>

    </main>
  );
}
