import {http} from "@/utils/httpClient";

export const saveTransaction = async({amount, paymentType}) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + "/transactions", {
    method: 'POST',
    body: JSON.stringify({transactionId: "xxx" + Math.random(), userId: 1, paymentType, amount, direction: "in"}),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json()
  return data
}

export const getBalance = async(userId) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${userId}/balance`, {
    method: 'GET'
  })
  const balance = await response.json()
  return balance
}
