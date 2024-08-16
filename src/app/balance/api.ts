import {http} from "@/services/httpClient";

export const getBalance = async() => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/balance`, {
    method: 'GET'
  })
  const balance = await response.json()
  return balance
}

export const createPaymentJob = async (amountPLN) => {
  try {
    const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/payment`, {
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

export const getTransactions = async() => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + '/transactions', {
    method: 'GET'
  })
  const result = await response.json()
  return result
}

export const createTONTransaction = async({amount, comment}) => {
  try{
    const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + '/transaction/ton', {
      method: 'POST',
      body: JSON.stringify({ amount, comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }
    const result = await response.json();
    return result;

  }catch(e){
    throw(e)
  }
}

export const getTonRate = async() => {
  try{
    const response = await fetch("https://tonapi.io/v2/rates?tokens=ton&currencies=pln", {
      method: 'GET',
    })
    const result = await response.json();
    return result.rates.TON.prices.PLN;
  }catch(e){
    throw(e)
  }
}
