'use client'

import {getTransactions} from "@/app/balance/api";
import {useCallback, useEffect, useState} from "react";
import {BackButton} from "@/shared/BackButton";
import {formatDate} from "@/app/orders/formatDate";
import {Pagination} from "@/shared/Pagination";

export default function Balance() {

  const [transactions, setTransactions] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [pagination, setPagination] = useState({})

  const updateTransactionsList = useCallback(({limit, offset}) => {
    getTransactions({limit, offset}).then(({transactions, pagination}) => {
      setTransactions(transactions)
      setPagination(pagination)
    })
  }, [])

  return (
    <main className="flex min-h-screen mt-10 flex-col items-center relative">

      <BackButton linkTo="/balance" />

      <h1 className="mb-20">
        История Транзакций
      </h1>

      <Pagination pagination={pagination} onChange={updateTransactionsList} limit={limit} offset={offset} setLimit={setLimit}
                  setOffset={setOffset}>
        <table className="w-full border-2 border-separate p-2 border-spacing-2">
          <thead>
          <tr>
            <td>Дата</td>
            <td>Тип</td>
            <td>Сумма</td>
            <td>Направление</td>
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
      </Pagination>


    </main>
  );
}
