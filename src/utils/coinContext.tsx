import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Coin } from "@/utils/fetchCoins";

type CoinProviderProps = {
  children: ReactNode;
};

type CoinContext = {
  activeCurrency: string;
  switchCurrency: (currency: string) => void;
  enteredCoin: string;
  setEnteredCoin: (enteredCoin: string) => void;
  sortBy: string;
  changeSort: (sortBy: string) => void;
};

const CoinContext = createContext({} as CoinContext);

export function useCoin() {
  return useContext(CoinContext);
}

export function CoinProvider({ children }: CoinProviderProps) {
  const [activeCurrency, setActiveCurrency] = useState("usd");
  const [enteredCoin, setEnteredCoin] = useState("");
  const [sortBy, setSortBy] = useState("market_cap");

  function switchCurrency(currency: string) {
    setActiveCurrency(currency);
  }

  function changeSort(sortBy: string) {
    setSortBy(sortBy);
  }


  return (
    <CoinContext.Provider
      value={{
        activeCurrency,
        switchCurrency,
        enteredCoin,
        setEnteredCoin,
        sortBy, 
        changeSort,
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
