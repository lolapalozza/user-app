export const saveTransaction = async({amount, paymentType}) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/transactions", {
    method: 'POST',
    body: JSON.stringify({transactionId: "xxx" + Math.random(), userId: 1, paymentType, amount, direction: "in"}),
    headers: {
      'Content-Type': 'application/json',
      'api_token': '1c4c00c76bd2d59902a983d304481a2a'
    }
  })
  const data = await response.json()
  return data
}

export const getBalance = async(userId) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${userId}/balance`, {
    method: 'GET',
    headers: {
      'api_token': '1c4c00c76bd2d59902a983d304481a2a',
      'user_id': userId
    }
  })
  const balance = await response.json()
  return balance
}
