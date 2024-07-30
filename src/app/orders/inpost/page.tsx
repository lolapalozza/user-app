'use client'

import {useContext, useEffect, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {getInpostOrders} from "@/app/orders/api";
import {formatOrderString} from "@/app/inpost/utils/formatOrderString";
import {formatDate} from "@/app/orders/formatDate";
import {UserContext} from "@/app/Auth";

export default function OrdersInpost() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([])

  const { user } = useContext(UserContext)

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  useEffect(() => {
    if(user.user_id){
      getInpostOrders(user.user_id).then(setOrders)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <table className="w-full border-2 border-separate p-2 border-spacing-2">
        <thead>
        <tr>
          <td>Order</td>
          <td>Pachkomat</td>
          <td>Price</td>
          <td>Date</td>
        </tr>
        </thead>
        <tbody>
        {orders.map((order) => {
          return <tr key={order.id} className="border-2">
            <td>
              {formatOrderString(order.items.reduce((acc, item) => {
                acc[item.product_id] = item.quantity;
                return acc;
              }, {}), products)}
            </td>
            <td>
              {order.pachkomat}
            </td>
            <td>
              {order.price}
            </td>
            <td>
              {formatDate(order.created_at)}
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </main>
  );
}
