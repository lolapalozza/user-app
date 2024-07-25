'use client'

import {NavigationBack} from "@/shared/NavigationBack";
import {useEffect, useState} from "react";
import {getBoughtDrops, getDropById} from "@/app/orders/api";

export default function OrdersDrop({params}) {

  const [drop, setDrop] = useState({})

  useEffect(() => {
    getDropById(params.dropId).then((setDrop))
  }, [])

  console.log(params.dropId)

  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <NavigationBack />

      <h1 className="mb-40">
        Drop Details
      </h1>

      {drop?.id}

    </main>
  );
}