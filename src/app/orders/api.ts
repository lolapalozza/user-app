import {http} from "@/services/httpClient";

export const getInpostOrders = async({userId, limit=10, offset=0}) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/orders/inpost?user_id=${userId}&limit=${limit}&offset=${offset}`, {
    method: 'GET'
  })
  const orders = await response.json()
  return orders
}

export const getBoughtDrops = async(userId) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/drops?user_id=${userId}`,{
    method: "GET"
  })
  const drops = await response.json()
  return drops
}

export const getDropById = async(dropId) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/drop?drop_id=${dropId}`,{
    method: "GET"
  })
  const drop = await response.json()
  return drop
}
