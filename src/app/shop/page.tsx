'use client'

import {BackButton} from "@/shared/BackButton";
import Link from "next/link";

export default function Shop() {
  return <main className="flex min-h-screen mt-10 flex-col items-center relative">
    <BackButton/>
    <div className="w-9/12 text-center">
      У нас вы можете сделать заказ через <Link href="/inpost">Inpost</Link>, а также приобрести <Link href="/drops">готовый клад</Link>
    </div>

    <ul className="flex gap-10 mt-10">
      <li className="flex flex-col items-center text-center">
        <Link href="/inpost" className="flex flex-col items-center">
          <img
            src="/icons/envelope.png"
            className="dark:invert mb-2"
            width={48}
            height={48}
          />
          <span>Заказать Почтой</span>
        </Link>
      </li>
      <li className="flex flex-col items-center text-center">
        <Link href="/drops" className="flex flex-col items-center">
          <img
            src="/icons/drop.png"
            className="dark:invert mb-2"
            width={48}
            height={48}
          />
          <span>Выбрать Клад</span>
        </Link>
      </li>
    </ul>
  </main>
}
