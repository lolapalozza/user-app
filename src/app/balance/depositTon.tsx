import {TonConnectButton, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";

export const DepositTon = () => {
  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  return <div>
    Soon ..
    <TonConnectButton />
    {
      wallet && (
      <div>
        <span>Connected wallet: {wallet.name}</span>
        <span>Device: {wallet.device.appName}</span>
      </div>
      )
    }
  </div>
}
