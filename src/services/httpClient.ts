class HttpClient {

  constructor(){
    this.headers = {
      "app": "user",
      "telegram_id": '8'
    }
  }

  setHeaders(key, value){
    this.headers[key] = value
  }

  fetch(url: String, params: RequestInit){
    return fetch(url, {
      ...params,
      headers:{
        ...params.headers,
        ...this.headers
      }
    })
  }
}

export const http = new HttpClient()
