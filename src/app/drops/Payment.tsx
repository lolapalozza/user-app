import Link from "next/link";

export const Payment = ({selection}) => {

  const balance = 500

  return <div>
    <h2>Ready to Pay?</h2>

    <p>Your Balance is: {balance}</p>

    <p>{selection.productTitle} {selection.district} {selection.amount}{selection.unit} - {selection.price}</p>

    <button>
      <Link href="/orders">Pay</Link>
    </button>

  </div>
}
