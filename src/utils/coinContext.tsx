import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useQuery } from "react-query";
import fetchCoins from "@/utils/fetchCoins";
import { Coin } from "@/utils/fetchCoins";

interface CoinData extends Array<Coin> {}

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
  coinData: CoinData;
  setCoinData: (coins: CoinData) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  errored: boolean;
  setErrored: (errored: boolean) => void;
};

const CoinContext = createContext({} as CoinContext);

export function useCoin() {
  return useContext(CoinContext);
}

export function CoinProvider({ children }: CoinProviderProps) {
  const [activeCurrency, setActiveCurrency] = useState("usd");
  const [enteredCoin, setEnteredCoin] = useState("");
  const [sortBy, setSortBy] = useState("market_cap");
  const [coinData, setCoinData] = useState<CoinData>([]);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  function switchCurrency(currency: string) {
    setActiveCurrency(currency);
  }

  function changeSort(sortBy: string) {
    setSortBy(sortBy);
  }

  const {
    data: coins,
    error,
    isError,
    isLoading,
  } = useQuery(["coins", activeCurrency], () => fetchCoins(activeCurrency));

  useEffect(() => {
    if (coins) {
      setCoinData(coins);
    }
    if (!isLoading) {
      setLoading(isLoading);
    }
    if (!isError) {
      setErrored(isError);
    }
  }, [coins]);

  return (
    <CoinContext.Provider
      value={{
        activeCurrency,
        switchCurrency,
        enteredCoin,
        setEnteredCoin,
        sortBy, 
        changeSort,
        coinData,
        setCoinData,
        loading,
        setLoading,
        errored,
        setErrored,
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
