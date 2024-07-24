'use client'

import {NavigationBack} from "@/shared/NavigationBack";
import {useState} from "react";

export default function OrdersDrops() {
  const [orders, setOrders] = useState([])

  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <NavigationBack />

      <h1 className="mb-40">
        Orders
      </h1>

      <table className="border-2 border-separate p-4 border-spacing-4">
        <thead>
        <tr>
          <td>UserID</td>
          <td>Phone</td>
          <td>Email</td>
          <td>Pachkomat</td>
          <td>Order</td>
          <td>Price</td>
          <td>Date</td>
        </tr>
        </thead>
        <tbody>
        {orders.map((order) => {
          return <tr key={order.id} className="border-2">
            <td>
              {order.user_id}
            </td>
            <td>
              {order.phone}
            </td>
            <td>
              {order.email}
            </td>
            <td>
              {order.pachkomat}
            </td>
            <td>
              {formatOrderString(order.items.reduce((acc, item) => {
                acc[item.product_id] = item.quantity;
                return acc;
              }, {}), products)}
            </td>
            <td>
              {order.price}
            </td>
            <td>
              {order.created_at}
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </main>
  );
}
