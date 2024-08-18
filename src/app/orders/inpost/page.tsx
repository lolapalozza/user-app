'use client'

import {useContext, useEffect, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {getInpostOrders} from "@/app/orders/api";
import {formatOrderString} from "@/app/inpost/utils/formatOrderString";
import {formatDate} from "@/app/orders/formatDate";
import {UserContext} from "@/app/Auth";
import {BackButton} from "@/shared/BackButton";

export default function OrdersInpost() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({})
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)

  const { user } = useContext(UserContext)

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  useEffect(() => {
    if(user.user_id){
      getInpostOrders({userId: user.user_id, limit, offset}).then(({orders, pagination}) => {
        setOrders(orders)
        setPagination(pagination)
      })
    }
  }, [user, limit, offset])

  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <BackButton linkTo="/orders" />

      {
        orders.length ? <>
          <div className="text-right w-full">
            <select className="text-black mb-2 mr-1" value={limit} onChange={(e) => setLimit(+e.target.value)}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
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
          <div className="flex gap-5 mt-5">
            {offset > 0 &&
                <button onClick={() => setOffset(offset - +limit)}
                        className="border-2 p-1 border-white">{`<`} Prev</button>
            }

            {offset} - {Math.min(offset + limit, pagination?.total)}

            {+limit + offset < pagination?.total &&
                <button onClick={() => setOffset(offset + +limit)}
                        className="border-2 p-1 border-white">Next {`>`}</button>
            }

            <div>
              Total: {pagination?.total}
            </div>
          </div>
        </> : <div className="mt-5">No Inpost Orders Yet</div>
      }


    </main>
  );
}
