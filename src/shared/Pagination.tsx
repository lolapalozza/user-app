import {useEffect} from "react";

export const Pagination = ({children, pagination, onChange, limit, offset, setLimit, setOffset}) => {

  useEffect(() => {
    onChange({limit, offset})
  }, [limit, offset, onChange])

  return <>
    <div className="text-right w-full">
      <select className="text-black mb-2 mr-1" value={limit} onChange={(e) => setLimit(+e.target.value)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
    {children}
    <div className="flex gap-5 mt-5 items-center">
      {offset > 0 &&
          <button onClick={() => setOffset(offset - +limit)}
                  className="border-2 p-1 border-white">{`<`} назад</button>
      }

      {offset} - {Math.min(offset + limit, pagination?.total)}

      {+limit + offset < pagination?.total &&
          <button onClick={() => setOffset(offset + +limit)}
                  className="border-2 p-1 border-white">вперед {`>`}</button>
      }

      <div>
        Всего: {pagination?.total}
      </div>
    </div>
  </>
}
