import {http} from "@/services/httpClient";

export const getUser = async() => {
  const response = await http.fetch(process.env.NEXT_PUBLIC_API_URL + `/user`, {
    method: 'GET'
  })
  const user = await response.json()
  return user;
}
