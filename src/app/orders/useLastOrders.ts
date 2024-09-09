import {useCallback, useContext, useEffect, useState} from "react";
import {getBoughtDrops, getInpostOrders} from "@/app/orders/api";
import {UserContext} from "@/app/Auth";

export const useLastOrders = () => {
  const [lastOrders, setLastOrders] = useState([])

  const { user } = useContext(UserContext)

  useEffect(() => {
    if(user?.user_id){
      const inpostPromise = getInpostOrders({userId: user.user_id})
      const dropsPromise = getBoughtDrops({userId: user.user_id})

      Promise.all([inpostPromise, dropsPromise]).then(([{orders}, {drops}]) => {
        const combinedOrders = [...orders, ...drops];
        combinedOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setLastOrders(combinedOrders)
      })

    }
  },[user.user_id])

  return lastOrders
}
