import React from "react";

const PlaceOrderButton = ({onSubmit, loading}) => {

  // useEffect(() => {
  //   window.Telegram?.WebApp?.MainButton?.setText("Place Order");
  //   window.Telegram?.WebApp?.MainButton?.show();
  //   window.Telegram?.WebApp?.onEvent('mainButtonClicked', onSubmit)
  //   return () => {
  //     window.Telegram?.WebApp?.offEvent('mainButtonClicked', onSubmit)
  //     window.Telegram?.WebApp?.MainButton?.hide();
  //   }
  // },[]);

  return <button disabled={loading} className="border-2 p-2 rounded mt-5 w-full" onClick={onSubmit}>
    Place Order
  </button>

}

PlaceOrderButton.displayName = "PlaceOrderButton";

export default PlaceOrderButton;
