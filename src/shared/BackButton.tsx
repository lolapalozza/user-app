import {useRouter} from "next/navigation";
import {useEffect} from "react";

interface INavigationBackProps {
  linkTo?: string;
  onClick: () => void | null;
}

export const BackButton = ({linkTo, onClick = null}: INavigationBackProps) => {

  const router = useRouter()

  const callback = () => {
    return onClick ? onClick : () => {
      router.push(linkTo || "/")
    }
  }

  useEffect(() => {
    showBackButton(callback)
    return () => hideBackButton(callback)
  }, [callback]);

  return <></>
}

export const showBackButton = (callback) => {
  window.Telegram?.WebApp?.BackButton?.onClick(callback);
  window.Telegram?.WebApp?.BackButton?.show()
}

export const hideBackButton = (callback) => {
  window.Telegram?.WebApp?.BackButton?.hide()
  window.Telegram?.WebApp?.BackButton?.offClick(callback);

}
