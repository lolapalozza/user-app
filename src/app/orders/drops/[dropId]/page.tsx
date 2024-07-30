'use client'

import {BackButton} from "@/shared/BackButton";
import {useEffect, useMemo, useState} from "react";
import {getBoughtDrops, getDropById} from "@/app/orders/api";
import {formatDate} from "@/app/orders/formatDate";

export default function OrdersDrop({params}) {

  const [drop, setDrop] = useState({})

  const photos = useMemo(() => {
    if(!drop || !drop.photos) return []
    return drop.photos.split(",")
  }, [drop])

  useEffect(() => {
    getDropById(params.dropId).then((setDrop))
  }, [])

  return (<>
    <h1 className="mb-20 mt-5">
      Drop Details
    </h1>

    {drop.id && <>
      <div>{drop.packages.product.short_description} - {drop.packages.quantity} {drop.packages.product.measure}</div>
      <div className="mb-2">{drop.district.city.city}, {drop.district.district}</div>

      {
        photos.map(photo => <img key={photo} className="mb-2" src={`${process.env.NEXT_PUBLIC_API_URL}/photos/${photo}`} />)
      }

      <div className="mb-5">{drop.comment}</div>
      <div className="text-sm">Purchase Date: {formatDate(drop.sold_at)}</div>
    </>}
  </>
  );
}
