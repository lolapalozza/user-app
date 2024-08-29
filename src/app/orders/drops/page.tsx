'use client'

import {BackButton} from "@/shared/BackButton";
import {useCallback, useContext, useEffect, useState} from "react";
import {getBoughtDrops} from "@/app/orders/api";
import {formatDate} from "@/app/orders/formatDate";
import {UserContext} from "@/app/Auth";
import {useRouter} from "next/navigation";
import {Pagination} from "@/shared/Pagination";

export default function OrdersDrops() {
  const [drops, setDrops] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [pagination, setPagination] = useState({})

  const router = useRouter()

  const { user } = useContext(UserContext)

  const updateDropsList = useCallback(({limit, offset}) => {
    if(user?.user_id){
      getBoughtDrops({limit, offset, userId: user.user_id}).then(({drops, pagination}) => {
        setDrops(drops)
        setPagination(pagination)
      })
    }
  }, [user])

  useEffect(() => {
    if (user) {
      updateDropsList({ limit, offset });
    }
  }, [user, limit, offset, updateDropsList]);

  const goToDrop = (dropId) => {
    router.push(`/orders/drops/${dropId}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center relative">

      <BackButton linkTo="/orders" />

      {drops?.length ? <Pagination pagination={pagination} onChange={updateDropsList} limit={limit} offset={offset} setLimit={setLimit}
                                  setOffset={setOffset}>
        <table className="w-full border-2 border-separate p-2 border-spacing-2">
        <thead>
        <tr>
          <td>Продукт</td>
          <td>Количество</td>
          <td>Стоимость</td>
          <td>Дата Заказа</td>
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
            <td>
            </td>
            <td>
              {formatDate(drop.soldAt)}
            </td>
          </tr>
        })}
        </tbody>
      </table></Pagination> : <div className="mt-5">
        Кладов не найдено
      </div>}


    </main>
  );
}
