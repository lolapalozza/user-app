import {http} from "@/services/httpClient";

export const addTransaction = async({amount, paymentType}) => {
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

export const createPaymentJob = async(amountPLN) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/payment`, {
    method: 'POST',
    body: JSON.stringify({amount: amountPLN}),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const result = await response.json()
  return result
}

export const getPaymentJob = async() => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/payment`, {
    method: 'GET'
  })
  const result = await response.json()
  return result
}
