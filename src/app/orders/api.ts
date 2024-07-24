import {http} from "@/utils/httpClient";

export const getInpostOrders = async() => {
  const userId = 1;
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/orders/inpost?user_id=${userId}`, {
    method: 'GET'
  })
  const orders = await response.json()
  return orders
}

export const getBoughtDrops = async() => {
  const userId = 1;
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/drops?user_id=${userId}`,{
    method: "GET"
  })
  const drops = await response.json()
  return drops
}
