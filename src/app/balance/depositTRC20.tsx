import QRCode from "react-qr-code";

export const DepositTRC20 = () => {
  return <div>
    <h3>Enter amount in PLN</h3>
    <input type="number" className="bg-transparent text-5xl" autoFocus />
  </div>
}


// <p>Deposit with USDT (TRC-20)</p>
// <p className="mb-20">Your balance will be updated automatically</p>
//
// {address}
// <QRCode value={address} />
//
// <button onClick={deposit}>Deposit</button>
