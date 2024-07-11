export const getCitiesWithProducts = async() => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/cities", {
    method: 'GET',
    headers: {
      'api_token': '1c4c00c76bd2d59902a983d304481a2a'
    }
  })
  const cities = await response.json()

  return cities;

}

export const getProductsByCity = async(cityId) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/cities/${cityId}/products`, {
    method: 'GET',
    headers: {
      'api_token': '1c4c00c76bd2d59902a983d304481a2a'
    }
  })
  const products = await response.json()

  return products;

}


export const getDropsToBuy = async(cityId, productId) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/cities/${cityId}/products/${productId}/drops`, {
    method: 'GET',
    headers: {
      'api_token': '1c4c00c76bd2d59902a983d304481a2a'
    }
  })
  const drops = await response.json()

  return drops;

}
