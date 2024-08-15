import {TonConnectButton, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {Loading} from "@/shared/Loading";
import {useState} from "react";

const address = 'UQBS8sti9dUFpJ4oxf1oFrt58Vs_NuUJ4G4APe3_cEHtqYJM'

export const DepositTon = () => {
  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const sendTransaction = () => {
    tonConnectUI.sendTransaction({
      validUntil: Math.floor(new Date() / 1000) + 360,
      messages: [
        {
          address: address,
          amount: (amount * 1000000000).toString() //Toncoin in nanotons
        }
      ]
    }).then(() => {
      // get transaction ID, check transaction receiver, check amount snf send these three to backend
      // back should find this transaction in TON blockchain, check amount, receiver and that this transaction is new and add it
    }).catch((e) => {
      console.log(e)
    })
  }

  return <div>
    <TonConnectButton/>
    {
      wallet?.name && <div className="mt-5">
        <h3>Enter amount in TON</h3>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number"
               className="bg-transparent text-5xl text-center mb-5 w-40 outline-none" autoFocus/>
        <div className="flex flex-col items-center gap-2 justify-center">
          <button className="border-2 border-white rounded p-2" onClick={sendTransaction}>Deposit</button>
          {isLoading && <Loading/>}
        </div>
      </div>
    }
  </div>
}
