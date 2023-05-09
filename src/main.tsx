import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import {
  localWallet,
  smartWallet,
  ThirdwebProvider,
} from "@thirdweb-dev/react";
import {
  accountFactoryContractAddress,
  chain,
  thirdwebApiKey,
} from "./const/constants";
import "./styles/globals.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={chain}
      supportedWallets={[
        smartWallet({
          factoryAddress: accountFactoryContractAddress,
          thirdwebApiKey: thirdwebApiKey,
          gasless: true,
          personalWallets: [
            localWallet({
              persist: true,
            }),
          ],
        }),
      ]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
