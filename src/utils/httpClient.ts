class HttpClient {

  constructor(){
    this.headers = {
      // 'api_token': '1c4c00c76bd2d59902a983d304481a2a',
      // "telegram_id": '1054413208'
      "tg_query": "query_id=AAGYEdk-AAAAAJgR2T5yJhUO&user=%7B%22id%22%3A1054413208%2C%22first_name%22%3A%22Fyodor%22%2C%22last_name%22%3A%22Khruschov%22%2C%22username%22%3A%22elevenmins%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1722002004&hash=372706769b22709b918ad3569ce2bd4d49d9c5e579b61d055cf76a51d909808e"
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
