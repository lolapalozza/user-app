import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul className="flex gap-10">
        <li className="flex flex-col items-center">
          <Image
            src="/icons/envelope.png"
            className="dark:invert"
            width={48}
            height={48}
          />
          <Link href="/inpost">InPost</Link>
        </li>
        <li className="flex flex-col items-center">
          <Image
            src="/icons/drop.png"
            className="dark:invert"
            width={48}
            height={48}
          />
          <Link href="/drops">Drops</Link>
        </li>
        <li className="flex flex-col items-center">
          <Image
            src="/icons/balance.png"
            className="dark:invert"
            width={48}
            height={48}
          />
          <Link href="/balance">Balance</Link>
        </li>
        <li className="flex flex-col items-center">
          <Image
            src="/icons/orders.png"
            className="dark:invert"
            width={48}
            height={48}
          />
          <Link href="/orders">Orders</Link>
        </li>
      </ul>
    </main>
  );
}
