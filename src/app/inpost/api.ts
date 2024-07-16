import {http} from "@/utils/httpClient";

export const getProducts = async() => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + "/products/all", {
    method: 'GET'
  })
  const productsDTO = await response.json()

  return Object.entries(productsDTO).map(([key, value]) => ({
    id: key,
    ...value
  }));

}
