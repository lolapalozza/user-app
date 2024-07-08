export const getProducts = async() => {
  const response = await fetch("http://195.133.88.35:8000" + "/products/all", {
    method: 'GET',
    headers: {
      'api_token': '1c4c00c76bd2d59902a983d304481a2a'
    }
  })
  const productsDTO = await response.json()

  return Object.entries(productsDTO).map(([key, value]) => ({
    id: key,
    ...value
  }));

}
