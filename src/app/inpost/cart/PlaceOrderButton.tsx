import {useEffect} from "react";

export const PlaceOrderButton = ({onSubmit, show}) => {

  useEffect(() => {
    if(show){
      window.Telegram.WebApp.MainButton.setText("Place Order");
      window.Telegram.WebApp.MainButton.show();
      window.Telegram.WebApp.onEvent('mainButtonClicked', onSubmit)
      return () => {
        window.Telegram.WebApp.offEvent('mainButtonClicked', onSubmit)
        window.Telegram.WebApp.MainButton.hide();
      }
    }else{
      window.Telegram.WebApp.MainButton.hide();
    }
  }, [show, onSubmit]);

  return <></>
}
