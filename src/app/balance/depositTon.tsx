import {TonConnectButton, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {Loading} from "@/shared/Loading";
import {useState} from "react";
import { Address } from "@ton/core";

export const DepositTon = () => {
  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const address = Address.parse('UQBS8sti9dUFpJ4oxf1oFrt58Vs_NuUJ4G4APe3_cEHtqYJM');

  const sendTransaction = () => {
    tonConnectUI.sendTransaction({
      messages: [
        {
          address: address.toRawString(),
          amount: "159713000" //Toncoin in nanotons
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
