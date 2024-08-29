'use client'

import {useCallback, useContext, useEffect, useState} from "react";
import {getProducts} from "@/app/inpost/api";
import {getBoughtDrops, getInpostOrders} from "@/app/orders/api";
import {formatOrderString} from "@/app/inpost/utils/formatOrderString";
import {formatDate} from "@/app/orders/formatDate";
import {UserContext} from "@/app/Auth";
import {BackButton} from "@/shared/BackButton";
import {getInpostStatus} from "@/app/orders/inpost/getInpostStatus";
import {Pagination} from "@/shared/Pagination";

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

  const updateInpostList = useCallback(({limit, offset}) => {
    if(user?.user_id){
      getInpostOrders({limit, offset, userId: user.user_id}).then(({orders, pagination}) => {
        setOrders(orders)
        setPagination(pagination)
      })
    }
  }, [user])

  useEffect(() => {
    if (user) {
      updateInpostList({ limit, offset });
    }
  }, [user, limit, offset, updateInpostList]);


  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <BackButton linkTo="/orders" />

      {
        orders?.length ? <Pagination pagination={pagination} onChange={updateInpostList} limit={limit} offset={offset} setLimit={setLimit}
                                     setOffset={setOffset}>
          <table className="w-full border-2 border-separate p-2 border-spacing-2">
            <thead>
            <tr>
              <td>Заказ</td>
              {/*<td>Пачкомат</td>*/}
              <td>Стоимость</td>
              <td>Дата создания</td>
              <td>Статус</td>
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
                {/*<td>*/}
                {/*  {order.pachkomat}*/}
                {/*</td>*/}
                <td>
                  {order.price}
                </td>
                <td>
                  {formatDate(order.created_at)}
                </td>
                <td>
                  {getInpostStatus(order)}
                </td>
              </tr>
            })}
            </tbody>
          </table>
        </Pagination> : <div className="mt-5">Заказов Inpost не найдено</div>
      }


    </main>
  );
}
