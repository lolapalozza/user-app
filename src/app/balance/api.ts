export const saveTransaction = async() => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/transactions", {
    method: 'POST',
    body: JSON.stringify({transactionId: "xxx", userId: 1, paymentType: "trc-20", amount: 123}),
    headers: {
      'Content-Type': 'application/json',
      'api_token': '1c4c00c76bd2d59902a983d304481a2a'
    }
  })
  const data = await response.json()
  return data
}
