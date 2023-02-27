import axios from "axios";

async function fetchCoins(currency: string) {
  const coingeckoUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
    currency +
    "&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const { data } = await axios.get(coingeckoUrl);
  return data;
}

export interface Coins {
  usd: Coin[];
  gbp: Coin[];
  eur: Coin[];
}

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

export default fetchCoins;
