import {http} from "@/services/httpClient";

export const getCitiesWithProducts = async() => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + "/cities/with-products", {
    method: 'GET'
  })
  const cities = await response.json()
  return cities
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

export const buyDrop = async({cityId, districtId, productId, packageId}) => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + '/drop', {
    method: "PUT",
    body: JSON.stringify({
      cityId, districtId, productId, packageId
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return response.json()
}
