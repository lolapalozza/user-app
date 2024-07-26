import crypto from "crypto";
import {http} from "@/utils/httpClient";

const INTERVAL = 500

export const authorization = {
  bot_token: '7435766909:AAG0Ue5yHw9h6YQ7p9AKvl1rL3usmeBNy9s',

  init: async() => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        // if (window.Telegram &&
        //   window.Telegram.WebApp.initDataUnsafe &&
        //   window.Telegram.WebApp.initDataUnsafe.user) {
          clearInterval(interval);
          // const initData = window.Telegram.WebApp.initData;
          const initData = 'query_id=AAGYEdk-AAAAAJgR2T5yJhUO&user=%7B%22id%22%3A1054413208%2C%22first_name%22%3A%22Fyodor%22%2C%22last_name%22%3A%22Khruschov%22%2C%22username%22%3A%22elevenmins%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1722002004&hash=372706769b22709b918ad3569ce2bd4d49d9c5e579b61d055cf76a51d909808e'
          const result = authorization.isValidHash(initData);
          if (result) {
            http.setHeaders("tg_query", initData);
          }
          resolve({ result, tg_query: initData });
        // }
      }, INTERVAL);
    });
  },

  isValidHash: (initData) => {
    const parsedData = window.Telegram.Utils.urlParseQueryString(initData)
    const hash = parsedData.hash
    const data_keys = Object.keys(parsedData).filter(v => v !== 'hash').sort()
    const items = data_keys.map(key => key + '=' + parsedData[key])
    const data_check_string = items.join('\n')

    const secret_key = authorization._HMAC_SHA256(authorization.bot_token, 'WebAppData')
    const hashGenerate = authorization._hex(authorization._HMAC_SHA256(data_check_string, secret_key))

    console.log(hashGenerate)
    console.log(hash)

    return Boolean(hashGenerate === hash)
  },

  _HMAC_SHA256: (value, key) => {
    return crypto.createHmac('sha256', key).update(value).digest()
  },

  _hex: (bytes) => {
    return bytes.toString('hex');
  }
}
