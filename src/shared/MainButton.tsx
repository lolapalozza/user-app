import {useEffect, useState} from "react";
import classNames from "classnames";

export const MainButton = ({children, className, onClick}) => {

  const buttonClasses = classNames(className, "w-full text-black rounded-2xl bg-sky-500 p-2")

  const [isTGenv] = useState(() => {
    return !!window.Telegram?.WebApp.initData;
  })

  useEffect(() => {
    if(isTGenv){
      window.Telegram.WebApp.MainButton.onClick(onClick)
      window.Telegram.WebApp.MainButton.setText(children)
      window.Telegram.WebApp.MainButton.setParams({is_visible: true})
    }
    return () => {
      if(isTGenv) {
        window.Telegram.WebApp.MainButton.offClick(onClick)
        window.Telegram.WebApp.MainButton.setParams({is_visible: false})
      }
    }
  }, [isTGenv])

  return <div className="w-full p-1">
    {isTGenv ? null : <button onClick={onClick} className={buttonClasses}>
      {children || "Отправить"}
    </button>}
  </div>
}
