import {http} from "@/utils/httpClient";

export const getCitiesWithProducts = async() => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + "/cities/with-products", {
    method: 'GET'
  })
  const cities = await response.json()

  return cities;

}

export const getProductsByCity = async(cityId) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/cities/${cityId}/products`, {
    method: 'GET'
  })
  const products = await response.json()

  return products;

}

export const getDropsToBuy = async(cityId, productId) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/cities/${cityId}/products/${productId}/drops`, {
    method: 'GET'
  })
  const drops = await response.json()

  return drops;

}
