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

  return (<>
    <h1 className="mb-20 mt-5">
      Drop Details
    </h1>

    {drop.id && <>
      {drop.district.city.city}<br/>
      {drop.district.district}<br/>
      {drop.packages.product.short_description}<br/>
      {drop.packages.product.short_description}<br/>
      {drop.packages.quantity}<br/>
      {drop.photos}<br/>
      {drop.comment}<br/>
      {drop.sold_at}<br/>
    </>}
  </>
  );
}
