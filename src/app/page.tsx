'use client';

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import Script from "next/script";
import {http} from "@/utils/httpClient";
import crypto from "crypto";

export default function Home() {

  const [userId, setUserId] = useState("")

  // Bot token
  const bot_token = '7435766909:AAG0Ue5yHw9h6YQ7p9AKvl1rL3usmeBNy9s';

  const isValidHash = () => {
    // Parse query data
    const parsedData = window.Telegram.Utils.urlParseQueryString(window.Telegram.WebApp.initData)

    // Get Telegram hash
    const hash = parsedData.hash

    // Remove 'hash' value & Sort alphabetically
    const data_keys = Object.keys(parsedData).filter(v => v !== 'hash').sort()

    // Create line format key=<value>
    const items = data_keys.map(key => key + '=' + parsedData[key])

    const data_check_string = items.join('\n')

    function HMAC_SHA256(value, key) {
      const crypto = require('crypto');
      return crypto.createHmac('sha256', key).update(value).digest()
    }

    function hex(bytes) {
      return bytes.toString('hex');
    }

    // Generate secret key
    const secret_key = HMAC_SHA256(bot_token, 'WebAppData')

    // Generate hash to validate
    const hashGenerate = hex(HMAC_SHA256(data_check_string, secret_key))

    // Return bool value is valid
    return Boolean(hashGenerate === hash)
  }


  useEffect(() => {
    const interval = setInterval(() => {
      if(window.Telegram && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user){
        const result = isValidHash()
        setUserId(result.toString())
      }
    }, 1000)

  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {/*<div className="ml-5 mt-5 self-start w-8 text-4xl text-black"></div>*/}

      <Script src="https://telegram.org/js/telegram-web-app.js" />

      {userId}

      <ul className="flex gap-10">
        <li className="flex flex-col items-center">
          <Link href="/inpost" className="flex flex-col items-center">
            <Image
              src="/icons/envelope.png"
              className="dark:invert"
              width={48}
              height={48}
            />
            <span>InPost</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/drops" className="flex flex-col items-center">
            <Image
              src="/icons/drop.png"
              className="dark:invert"
              width={48}
              height={48}
            />
            <span>Drops</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/balance" className="flex flex-col items-center">
            <Image
              src="/icons/balance.png"
              className="dark:invert"
              width={48}
              height={48}
            />
            <span>Balance</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/orders" className="flex flex-col items-center">
            <Image
              src="/icons/orders.png"
              className="dark:invert"
              width={48}
              height={48}
            />
            <span>Orders</span>
            </Link>
        </li>
      </ul>
    </main>
  );
}
