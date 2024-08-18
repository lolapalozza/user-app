'use client'

import {BackButton} from "@/shared/BackButton";
import {useContext, useEffect, useState} from "react";
import {getBoughtDrops} from "@/app/orders/api";
import {formatDate} from "@/app/orders/formatDate";
import {UserContext} from "@/app/Auth";
import {useRouter} from "next/navigation";

export default function OrdersDrops() {
  const [drops, setDrops] = useState([])
  const router = useRouter()

  const { user } = useContext(UserContext)

  useEffect(() => {
    if(user.user_id){
      getBoughtDrops(user.user_id).then((setDrops))
    }
  }, [user])

  const goToDrop = (dropId) => {
    router.push(`/orders/drops/${dropId}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <BackButton linkTo="/orders" />

      {drops.length ? <table className="w-full border-2 border-separate p-2 border-spacing-2">
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
          return <tr key={drop.id} className="border-2 cursor-pointer" onClick={() => goToDrop(drop.id)}>
            <td>
              <span>{drop.productTitle}</span>
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
      </table> : <div className="mt-5">
        No Inpost Orders Yet
      </div>}


    </main>
  );
}
