import React from "react";
import { routes } from "routes";
import Web3Provider from "context/web3";
import { createRoot } from "react-dom/client";
import reportWebVitals from "reportWebVitals";
import SidebarProvider from "context/sidebar";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "goerli";

const router = createBrowserRouter(routes);

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <SidebarProvider>
        <Web3Provider>
          <RouterProvider router={router} />
        </Web3Provider>
      </SidebarProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
