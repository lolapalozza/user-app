import {useState} from "react";
import classNames from "classnames";

export const ClickToCopy = ({className, children, copyData}) => {

  const [showCopied, setShowCopied] = useState(false)

  const containerClasses = classNames(className, "relative")
  const tooltipClasses = classNames({"opacity-100": showCopied, "opacity-0": !showCopied}, "rounded-xl", "p-2", "border-white", "absolute", "transition-opacity", "copy-text-tooltip", "text-sm")

  const copy = async() => {
    await navigator.clipboard.writeText(copyData)
    setShowCopied(true)
    setTimeout(() => {
      setShowCopied(false)
    }, 2000)
  }

  return <div className={containerClasses}>
    <div className="absolute top-0.5 right-0.5">
      <img onClick={copy} src="icons/icon-copy.png" width={16} height={16} className="cursor-pointer dark:invert mb-2"/>
    </div>
    <div className={tooltipClasses}>
      Скопировано!
    </div>
    <div className="cursor-pointer" onClick={copy}>
      {children}
    </div>
  </div>
}
