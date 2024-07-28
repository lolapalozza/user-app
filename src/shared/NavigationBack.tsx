import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

interface INavigationBackProps {
  linkTo?: string;
}

export const NavigationBack = ({linkTo}: INavigationBackProps) => {

  const router = useRouter()

  useEffect(() => {
    showBackButton(() => {
      router.push(linkTo || "/")
    })
  }, [router, linkTo]);

  return <></>
}

export const showBackButton = (callback) => {
  window.Telegram.WebApp.BackButton.onClick(callback);
  window.Telegram.WebApp.BackButton.show()
}

export const hideBackButton = () => {
  window.Telegram?.WebApp?.BackButton?.hide()
}
