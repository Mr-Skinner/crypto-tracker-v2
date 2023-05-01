import axios from "axios";
import { useQuery } from "react-query";

export interface Coin {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: null;
  symbol: string;
  total_supply: number;
  total_volume: number;
}

interface CoinData extends Array<Coin> {}

function fetchCoins(currency: string) {
  const coingeckoUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
    currency +
    "&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const { isLoading, error, data, isFetching } = useQuery<CoinData>({
    queryKey: ["coins"],
    queryFn: () =>
      axios
        .get(coingeckoUrl)
        .then((res) => res.data),
  });

  if (isLoading || isFetching) return "Refreshing...";
  if (error) return "An error has occurred";

  return data;
}

export default fetchCoins;
