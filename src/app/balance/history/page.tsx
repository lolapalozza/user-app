'use client'

import {getTransactions} from "@/app/balance/api";
import {useEffect, useState} from "react";
import {BackButton} from "@/shared/BackButton";
import {formatDate} from "@/app/orders/formatDate";

export default function Balance() {

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions().then((setTransactions))
  }, [])

  return (
    <main className="flex min-h-screen mt-10 flex-col items-center relative">

      <BackButton linkTo="/balance" />

      <h1 className="mb-20">
        Transactions History
      </h1>

      <table className="border-2 border-separate p-2 border-spacing-2">
        <thead>
        <tr>
          <td>Date</td>
          <td>Type</td>
          <td>Amount</td>
          <td>Direction</td>
        </tr>
        </thead>
        <tbody>
        {transactions.map((tr, index) => <tr key={index}>
            <td>{formatDate(tr.created_at)}</td>
            <td>{tr.transaction_type}</td>
            <td>{tr.amount}</td>
            <td>{tr.direction}</td>
          </tr>
        )}
        </tbody>
      </table>

    </main>
  );
}
