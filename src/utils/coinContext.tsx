import CoinCatalogue from "@/components/Catalogue/CoinCatalogue";
import { createContext, ReactNode, useContext, useState } from "react";

type CoinProviderProps = {
  children: ReactNode;
};

type CoinContext = {
  activeCurrency: string;
  switchCurrency: (currency: string) => void;
};

const CoinContext = createContext({} as CoinContext);

export function useCoin() {
  return useContext(CoinContext);
}

export function CoinProvider({ children }: CoinProviderProps) {
  const [activeCurrency, setActiveCurrency] = useState("usd");
  function switchCurrency(currency: string) {
    setActiveCurrency(currency);
  }

  return (
    <CoinContext.Provider
      value={{
        activeCurrency,
        switchCurrency,
      }}
    >
      {children}
      <CoinCatalogue/>
    </CoinContext.Provider>
  );
}
