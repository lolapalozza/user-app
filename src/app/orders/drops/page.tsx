'use client'

import {NavigationBack} from "@/shared/NavigationBack";
import {useEffect, useState} from "react";
import {getBoughtDrops} from "@/app/orders/api";
import Link from "next/link";

export default function OrdersDrops() {
  const [drops, setDrops] = useState([])

  useEffect(() => {
    getBoughtDrops().then((setDrops))
  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <table className="border-2 border-separate p-4 border-spacing-4">
        <thead>
        <tr>
          <td>Product</td>
          <td>Quantity</td>
          <td>City</td>
          <td>District</td>
          <td>Price</td>
          <td>Purchase Date</td>
        </tr>
        </thead>
        <tbody>
        {drops.map((drop) => {
          return <tr key={drop.id} className="border-2">
            <td>
              <Link href={`/orders/drops/${drop.id}`} className="flex flex-col items-center">
                <span className="text-blue-300">{drop.productTitle}</span>
              </Link>
            </td>
            <td>
              {drop.packageQuantity}
            </td>
            <td>
              {drop.cityName}
            </td>
            <td>
              {drop.districtName}
            </td>
            <td>
            </td>
            <td>
              {drop.soldAt}
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </main>
  );
}
