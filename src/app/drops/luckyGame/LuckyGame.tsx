'use client'

import React, {useMemo, useState} from "react";
import {Board} from "@/app/lucky/Board";

const initialNumberArr = [...Array(100).keys()].map(x => ({ number: x + 1, selected: false }));
const limit = 20

export const LuckyGame = () => {

  const [numbers, setNumbers] = useState(initialNumberArr);

  const selected = useMemo(() => {
      return numbers.filter(item => item.selected).length;
    }, [numbers])

  const rest = useMemo(() => {
    return limit - selected
  }, [selected])

  const [generated, setGenerated] = useState(() => {
    return Math.random() * 100
  })

  const answer = useMemo(() => {
    return Math.floor(generated) + 1;
  }, [generated])

  const checkAnswer = () => {
    if(numbers[+answer - 1].selected){
      alert('YES')
    }else{
      alert("NO")
    }
  }

  return (<>
      {answer}
    <Board numbers={numbers} setNumbers={setNumbers} limit="20" />

      <div>
        <div>Выбрано: {selected}</div>
        <div>Осталось: {rest}</div>
      </div>

      <button onClick={checkAnswer} className="border-2 p-2 rounded">
        Get Lucky!
      </button>
  </>
  );
};
