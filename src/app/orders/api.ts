import {http} from "@/utils/httpClient";

export const getInpostOrders = async() => {
  const userId = 1;
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/orders/inpost?user_id=${userId}`, {
    method: 'GET'
  })
  const orders = await response.json()
  return orders
}

export const createInpostOrder = async({userId, price, name, phone, email, pachkomat, order}) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + "/inpost", {
    method: "POST",
    body: JSON.stringify({
      userId, price, name, phone, email, pachkomat, order
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return response.json()
}
