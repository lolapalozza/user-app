'use client'

import {BackButton} from "@/shared/BackButton";
import {useContext, useEffect, useState} from "react";
import {getBoughtDrops} from "@/app/orders/api";
import Link from "next/link";
import {formatDate} from "@/app/orders/formatDate";
import {UserContext} from "@/app/Auth";

export default function OrdersDrops() {
  const [drops, setDrops] = useState([])

  const { user } = useContext(UserContext)

  useEffect(() => {
    if(user.user_id){
      getBoughtDrops(user.user_id).then((setDrops))
    }
  }, [user])

  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <BackButton linkTo="orders" />

      <table className="w-full border-2 border-separate p-2 border-spacing-2">
        <thead>
        <tr>
          <td>Product</td>
          <td>Quantity</td>
          {/*<td>City</td>*/}
          {/*<td>District</td>*/}
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
            {/*<td>*/}
            {/*  {drop.cityName}*/}
            {/*</td>*/}
            {/*<td>*/}
            {/*  {drop.districtName}*/}
            {/*</td>*/}
            <td>
            </td>
            <td>
              {formatDate(drop.soldAt)}
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </main>
  );
}
