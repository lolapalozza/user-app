import Link from "next/link";
import Image from "next/image";

export const NavigationBack = ({linkTo}) => {
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
