import {TonConnectButton, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {Loading} from "@/shared/Loading";
import {useEffect, useMemo, useState} from "react";
import TonWeb from "tonweb";
import {createTONTransaction, getTonRate} from "@/app/balance/api";

export const DepositTon = ({onSuccess, walletAddress}) => {
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

    if(amount < 10){
      setMessage("Amount should be more than 10 PLN")
      return setTimeout(() => {
        setMessage("")
      }, 4000)
    }

    setIsLoading(true)

    const comment = `ton:${tonAmount},pln:${amount};` + Math.random() // we use PLN amount from here!

    let a = new TonWeb.boc.Cell();
    a.bits.writeUint(0, 32);
    a.bits.writeString(comment);
    let payload = TonWeb.utils.bytesToBase64(await a.toBoc());

    tonConnectUI.sendTransaction({
      validUntil: Math.floor(new Date() / 1000) + 360,
      messages: [
        {
          address: walletAddress,
          amount: (tonAmount * 1000000000).toString(), //Toncoin in nanotons
          payload
        }
      ]
    }).then((result) => { // after transaction done we should check it on backend and create transaction in our db
      setTimeout(() => {
        createTONTransaction({amount: (tonAmount * 1000000000).toString(), comment})
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
          }).catch(() => { // here transaction done, but dont count
          setIsLoading(false)
          setMessage("transaction done, but we didn\'t find it in blockchain. Contact admin")
          console.log(amount, comment)
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
        <h3>Сумма Депозита (PLN):</h3>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number"
               className="bg-transparent text-5xl text-center w-40 outline-none" pattern="^\d*$" autoFocus/>
          <div className="mb-5 mt-2">{tonAmount} TON</div>
        <div className="flex flex-col items-center gap-2 justify-center">
          <button className="border-2 border-white rounded p-2" onClick={sendTransaction}>Оплатить</button>
          {isLoading && <Loading/>}
          {message}
        </div>
      </div>
    }
  </div>
}
