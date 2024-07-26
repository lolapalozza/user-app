class HttpClient {

  constructor(){
    this.headers = {
      // 'api_token': '1c4c00c76bd2d59902a983d304481a2a',
      // "telegram_id": '1054413208'
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
