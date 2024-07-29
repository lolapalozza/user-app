import {useRouter} from "next/navigation";
import {useEffect} from "react";

interface INavigationBackProps {
  linkTo?: string;
}

export const BackButton = ({linkTo}: INavigationBackProps) => {

  const router = useRouter()

  useEffect(() => {
    showBackButton(() => {
      router.push(linkTo || "/")
    })
  }, [router, linkTo]);

  return <></>
}

export const showBackButton = (callback) => {
  window.Telegram?.WebApp?.BackButton?.onClick(callback);
  window.Telegram?.WebApp?.BackButton?.show()
}

export const hideBackButton = () => {
  window.Telegram?.WebApp?.BackButton?.hide()
}
