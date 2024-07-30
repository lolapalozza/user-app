import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

interface ICartButton {
  cartQuantity: number | undefined
}

export const CartButton = ({cartQuantity}: ICartButton) => {

  const router = useRouter()

  useEffect(() => {
    if(cartQuantity){
      window.Telegram?.WebApp?.MainButton?.setText(`Cart (${cartQuantity})`);
      window.Telegram?.WebApp?.MainButton?.onClick(() => {
        router.push("/inpost/cart")
      });
      window.Telegram?.WebApp?.MainButton?.show();

      return () => {
        window.Telegram?.WebApp?.MainButton?.hide();
      }
    }else{
      window.Telegram?.WebApp?.MainButton?.hide();
    }

  }, [router, cartQuantity]);

  if(process.env.NEXT_PUBLIC_ENV){
    return <Link href="/inpost/cart">
      Cart
    </Link>
  }else{
    return <></>
  }
}
