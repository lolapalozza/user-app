import crypto from "crypto";
import {http} from "@/services/httpClient";

const INTERVAL = 500

export const authorization = {
  bot_token: process.env.NEXT_PUBLIC_BOT_TOKEN,

  init: async() => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (window.Telegram &&
          window.Telegram.WebApp.initDataUnsafe &&
          window.Telegram.WebApp.initDataUnsafe.user) {
          clearInterval(interval);
          const initData = window.Telegram.WebApp.initData;
          const result = authorization.isValidHash(initData);
          if (result) {
            http.setHeaders("tg_query", initData);
          }
          resolve({ result, tg_query: initData });
        }
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

    return Boolean(hashGenerate === hash)
  },

  _HMAC_SHA256: (value, key) => {
    return crypto.createHmac('sha256', key).update(value).digest()
  },

  _hex: (bytes) => {
    return bytes.toString('hex');
  }
}
