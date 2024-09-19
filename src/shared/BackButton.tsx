import {useRouter} from "next/navigation";
import {useEffect} from "react";

interface INavigationBackProps {
  linkTo?: string;
  onClick: () => void;
}

export const BackButton = ({linkTo, onClick}: INavigationBackProps) => {

  const router = useRouter()

  useEffect(() => {
    onClick ? showBackButton(onClick) : showBackButton(() => {
      // router.push(linkTo || "/")
    })
    return hideBackButton
  }, [router, linkTo, onClick]);

  return <></>
}

export const showBackButton = (callback) => {
  window.Telegram?.WebApp?.BackButton?.onClick(callback);
  window.Telegram?.WebApp?.BackButton?.show()
}

export const hideBackButton = () => {
  window.Telegram?.WebApp?.BackButton?.hide()
}
