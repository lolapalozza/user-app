import {useCallback, useContext, useEffect, useState} from "react";
import {getBoughtDrops, getInpostOrders} from "@/app/orders/api";
import {UserContext} from "@/app/Auth";
import {getProducts} from "@/app/inpost/api";
import {formatOrderString} from "@/app/inpost/utils/formatOrderString";

export const useLastOrders = () => {
  const [lastOrders, setLastOrders] = useState([])
  const [products, setProducts] = useState([])

  const { user } = useContext(UserContext)

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    })
  }, [])

  const addThumbs = (orders) => {
    return orders.map(order => {
      if (order.type === 'inpost') {
        const sortedItems = order.items.sort((a, b) => b.quantity - a.quantity);
        const thumbs = sortedItems.map(item => {
          const product = products.find(p => p.id == item.product_id);
          return product ? product.photo_urls : null;
        }).filter(Boolean); // Исключаем null если продукт не найден
        return { ...order, thumbs };
      } else if (order.type === 'drop') {
        const product = products.find(p => p.short_description === order.productTitle);
        const thumbs = product ? [product.photo_urls] : [];
        return { ...order, thumbs };
      } else {
        return order; // Возвращаем заказ без изменений, если тип не "inpost" или "drop"
      }
    });
  };

  useEffect(() => {
    if(user?.user_id){
      const inpostPromise = getInpostOrders({userId: user.user_id})
      const dropsPromise = getBoughtDrops({userId: user.user_id})

      Promise.all([inpostPromise, dropsPromise]).then(([{orders}, {drops}]) => {
        const inpostOrders = orders.map(order => ({ ...order, type: 'inpost' }));
        const dropOrders = drops.map(drop => ({ ...drop, type: 'drop' }));
        const combinedOrders = [...inpostOrders, ...dropOrders];
        const ordersWithThumbs = addThumbs(combinedOrders)

        ordersWithThumbs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setLastOrders(ordersWithThumbs);
      });

    }
  },[user.user_id])

  return lastOrders
}
