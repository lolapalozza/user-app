import Link from "next/link";
import Image from "next/image";

interface INavigationBackProps {
  linkTo?: String;
}

export const NavigationBack = ({linkTo}: INavigationBackProps) => {
  return <div className="flex self-start ml-5 mt-5">
    <Link href={linkTo || "/"}>
      <Image
        src="/icons/icon-left.png"
        className="dark:invert"
        width={24}
        height={24}
      />
    </Link>
  </div>
}
