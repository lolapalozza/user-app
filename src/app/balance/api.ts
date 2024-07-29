import {http} from "@/utils/httpClient";

export const saveTransaction = async({amount, paymentType}) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + "/transactions", {
    method: 'POST',
    body: JSON.stringify({transactionId: "xxx" + Math.random(), paymentType, amount, direction: "in"}),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json()
  return data
}

export const getBalance = async() => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/balance`, {
    method: 'GET'
  })
  const balance = await response.json()
  return balance
}
