import Link from "next/link";

export const Payment = ({selection}) => {

  const balance = 500

  const pay = () => {
    console.log("pay")
  }

  return <div>
    <h2 className="mb-5">Ready to Pay?</h2>

    <p className="mb-5">Your Balance is: {balance}</p>

    <p className="mb-5">{selection.product.product} {selection.drop.district.title} {selection.drop.amount}{selection.drop.unit} - {selection.drop.price}</p>

    <div className="flex gap-2">
      <Link href="/orders">
        <button onClick={pay} className="border-2 border-white rounded p-2">
          Pay
        </button>
      </Link>
      <Link href="/orders">
        <button disabled={true} className="border-2 border-white rounded p-2 bg-gray-700">
          Get Lucky (Game)
        </button>
      </Link>
    </div>

  </div>
}
