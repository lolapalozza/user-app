'use client'

import Link from "next/link";
import {DropSelector} from "@/app/drops/DropSelector";
import {useState} from "react";
import {Payment} from "@/app/drops/Payment";

export default function Drops() {
  const [selection, setSelection] = useState({
    step: 1,
    city: undefined,
    district: undefined,
    amount: undefined,
    unit: undefined,
    price: undefined,
    productId: undefined,
    productTitle: undefined,
    dropId: undefined
  })
  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative">

      <div className="absolute left-0 ml-20">
        <span>
          <Link href="/">Back Home</Link>
        </span>
      </div>

      <h1 className="mb-40">
        Drops
      </h1>

      <div>
        {selection.drop ? <Payment selection={selection} /> : <DropSelector selection={selection} setSelection={setSelection} />}
      </div>

    </main>
  );
}
