import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        <li>
          <Link href="/inpost">Create InPost Order</Link>
        </li>
        <li>
          <Link href="/drops">Buy a Drop</Link>
        </li>
        <li>
          <Link href="/balance">Check Balance</Link>
        </li>
        <li>
          <Link href="/orders">My Orders</Link>
        </li>
      </ul>
    </main>
  );
}
