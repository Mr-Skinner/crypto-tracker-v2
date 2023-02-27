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
    </CoinContext.Provider>
  );
}

interface ObjectKeys {
  [key: string]: any;
}

interface countryCodeMapping extends ObjectKeys {
  usd: string;
  gbp: string;
  eur: string;
}

interface currencyMapping extends ObjectKeys {
  usd: string;
  gbp: string;
  eur: string;
}

export const currencyMap: currencyMapping = {
  usd: "$",
  gbp: "£",
  eur: "€",
};

export const countryCodeMap: countryCodeMapping = {
  usd: "en-US",
  gbp: "en-GB",
  eur: "de-DE",
};
