export const getCitiesWithProducts = async() => {
  const response = await fetch("http://localhost:8080" + "/cities", {
    method: 'GET',
    headers: {
      'api_token': '1c4c00c76bd2d59902a983d304481a2a'
    }
  })
  const cities = await response.json()

  return cities;

}

export const getProductsByCity = async(cityId) => {
  const response = await fetch("http://localhost:8080" + `/cities/${cityId}/products`, {
    method: 'GET',
    headers: {
      'api_token': '1c4c00c76bd2d59902a983d304481a2a'
    }
  })
  const products = await response.json()

  return products;

}
