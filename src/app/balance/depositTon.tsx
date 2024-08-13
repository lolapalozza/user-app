import {TonConnectButton, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {Loading} from "@/shared/Loading";
import {useState} from "react";

export const DepositTon = () => {
  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const sendTransaction = () => {
    tonConnectUI.sendTransaction({
      messages: [
        {
          address: "UQAAAcpu6iAoOSdhgCbLh76280j7Y6BFpQ5q60XLJu7WQKZC",
          amount: (amount * 1000000000).toString() //Toncoin in nanotons
        }
      ]
    })
  }

  return <div>
    <TonConnectButton/>

    <h3>Enter amount in TON</h3>
    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number"
           className="bg-transparent text-5xl text-center mb-5 w-40 outline-none" autoFocus/>
    <div className="flex flex-col items-center gap-2 justify-center">
      <button className="border-2 border-white rounded p-2" onClick={sendTransaction}>Deposit</button>
      {isLoading && <Loading/>}
    </div>

  </div>
}
