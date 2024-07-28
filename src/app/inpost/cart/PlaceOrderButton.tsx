import {useEffect} from "react";

export const PlaceOrderButton = ({onSubmit, show}) => {

  useEffect(() => {
    if(show){
      window.Telegram.WebApp.MainButton.setText("Place Order");
      window.Telegram.WebApp.MainButton.onClick(() => {
        onSubmit()
      });
      window.Telegram.WebApp.MainButton.show();
      return () => {
        window.Telegram.WebApp.MainButton.hide();
      }
    }else{
      window.Telegram.WebApp.MainButton.hide();
    }
  }, [show, onSubmit]);

  return <></>
}
