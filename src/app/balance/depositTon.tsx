import {TonConnectButton, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {Loading} from "@/shared/Loading";
import {useEffect, useMemo, useState} from "react";
import TonWeb from "tonweb";
import {createTONTransaction, getTonRate} from "@/app/balance/api";

const address = 'UQBS8sti9dUFpJ4oxf1oFrt58Vs_NuUJ4G4APe3_cEHtqYJM'

export const DepositTon = ({onSuccess}) => {
  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [ratePLN, setRatePLN] = useState(null)

  useEffect(() => {
    getTonRate().then((rate) => {
      setRatePLN(rate)
    })
  }, [])

  const tonAmount = useMemo(() => {
    return (amount / ratePLN).toFixed(2)
  }, [amount, ratePLN])

  const sendTransaction = async() => {

    // if(amount < 10){
    //   setMessage("Amount should be more than 10 PLN")
    //   return setTimeout(() => {
    //     setMessage("")
    //   }, 4000)
    // }

    setIsLoading(true)

    const testComment = amount + Math.random()

    let a = new TonWeb.boc.Cell();
    a.bits.writeUint(0, 32);
    a.bits.writeString(testComment);
    let payload = TonWeb.utils.bytesToBase64(await a.toBoc());

    tonConnectUI.sendTransaction({
      validUntil: Math.floor(new Date() / 1000) + 360,
      messages: [
        {
          address: address,
          amount: (tonAmount * 1000000000).toString(), //Toncoin in nanotons
          payload
        }
      ]
    }).then((result) => {
      setTimeout(() => {
        createTONTransaction({amount: (tonAmount * 1000000000).toString(), comment: testComment})
          .then((data) => {
            if(data.success){
              setAmount(0)
              onSuccess()
              setIsLoading(false)
              setMessage("Success")
              setTimeout(() => {
                setMessage("")
              }, 4000)
            }
          }).catch(() => {
          setIsLoading(false)
        })
      },5000)
    }).catch((e) => {
      console.log(e)
      setIsLoading(false)
    })
  }

  return <div className="flex flex-col items-center justify-center text-center">
    <TonConnectButton/>
    {
      wallet?.name && <div className="mt-5">
        <h3>Enter amount in PLN</h3>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number"
               className="bg-transparent text-5xl text-center w-40 outline-none" autoFocus/>
          <div className="mb-5 mt-2">approximately {tonAmount} in TON</div>
        <div className="flex flex-col items-center gap-2 justify-center">
          <button className="border-2 border-white rounded p-2" onClick={sendTransaction}>Deposit</button>
          {isLoading && <Loading/>}
          {message}
        </div>
      </div>
    }
  </div>
}
