import {getBalance} from "@/app/balance/api";
import {useEffect, useState} from "react";

export const useBalance = (deps = []) => {

  const [balance, setBalance] = useState(0)
  const [balanceLoading, setBalanceLoading] = useState(false)

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 15000)
    return () => {
      clearInterval(interval)
    }
  }, deps)

  const fetchBalance = () => {
    setBalanceLoading(true)
    getBalance().then((_balance) => {
      setBalance(_balance.balance)
      setBalanceLoading(false)
    })
  }

  return [balance, balanceLoading, fetchBalance]
}
