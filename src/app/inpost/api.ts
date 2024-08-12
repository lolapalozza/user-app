import {http} from "@/services/httpClient";

export const getProducts = async() => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
    method: 'GET'
  })
  const productsDTO = await response.json()

  return Object.entries(productsDTO).map(([key, value]) => ({
    id: key,
    ...value
  }));
}

export const createInpostOrder = async({userId, price, phone, email, pachkomat, order}) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + "/inpost", {
    method: "POST",
    body: JSON.stringify({
      userId, price, phone, email, pachkomat, order
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return response.json()
}

export const getCategories = async() => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + "/categories", {
    method: "GET"
  })
  return response.json()
}
