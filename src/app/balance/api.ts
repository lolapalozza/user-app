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

export const createPaymentJob = async (amountPLN) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/payment`, {
      method: 'POST',
      body: JSON.stringify({ amount: amountPLN }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getPaymentJob = async() => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/payment`, {
    method: 'GET'
  })
  const result = await response.json()
  return result
}
