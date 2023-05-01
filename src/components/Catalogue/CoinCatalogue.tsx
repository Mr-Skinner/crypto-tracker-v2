import fetchCoins, { Coin } from "@/utils/fetchCoins";
import { useCoin } from "@/utils/coinContext";

import SingleCoin from "./SingleCoin";

function CoinCatalogue() {
  const { activeCurrency, enteredCoin, sortBy } = useCoin();

  const coinData = fetchCoins(activeCurrency);

  if (coinData == "Refreshing..." || coinData == "An error has occurred") {
    return (
      <main className="p-4 sm:p-8 dark:bg-zinc-800 bg-gray-100 h-full w-full">
        {coinData}
      </main>
    );
  }

  if (!coinData) {
    return (
      <main className="p-4 sm:p-8 dark:bg-zinc-800 bg-gray-100 h-full w-full">
        Unexpected error, api response is null!
      </main>
    );
  }

  //console.log("coinData:", coinData);
  //console.log("isError:", errored);
  //console.log("isLoading:", loading);
  //console.log("Search input", enteredCoin);

  let sortedCoins = [...coinData];
  switch (sortBy) {
    case "market_cap":
      sortedCoins = coinData.sort((a, b) =>
        a.market_cap < b.market_cap ? 1 : -1
      );
      break;
    case "top_movers":
      sortedCoins = coinData.sort((a, b) =>
        Math.abs(a.price_change_percentage_24h) <
        Math.abs(b.price_change_percentage_24h)
          ? 1
          : -1
      );
      break;
    case "name_asc":
      sortedCoins = coinData.sort((a, b) => (a.name > b.name ? 1 : -1));
      break;
    case "name_desc":
      sortedCoins = coinData.sort((a, b) => (a.name < b.name ? 1 : -1));
      break;
    case "price_asc":
      sortedCoins = coinData.sort((a, b) =>
        a.current_price > b.current_price ? 1 : -1
      );
      break;
    case "price_desc":
      sortedCoins = coinData.sort((a, b) =>
        a.current_price < b.current_price ? 1 : -1
      );
      break;
    default:
      break;
  }

  let filteredCoins = sortedCoins.filter((coin) => {
    if (coin) {
      return coin.name.toLowerCase().includes(enteredCoin.toLowerCase());
    }

    return 0;
  });

  return (
    <main className="p-4 sm:p-8 dark:bg-zinc-800 bg-gray-100 h-full w-full">
      <div className="flex w-full pl-16 sm:pl-[5rem] gap-4 text-zinc-400">
        <h2 className="hidden sm:block text-xl hover:border-b-[1px]">Name</h2>
        <h2 className="text-md sm:text-xl">Current Price</h2>
        <h2 className="text-md sm:text-xl">24hrs ⇵</h2>
        <h2 className="text-md sm:text-xl">All Time High</h2>
        <h2 className="text-md sm:text-xl">All Time Low</h2>
      </div>
      <section className="h-[75vh] overflow-y-auto">
        {filteredCoins.map((coin: Coin, id: number) => {
          if (id < 15) {
            //console.log(coin);
            let odd = true;
            if (id % 2 == 0) {
              odd = false;
            }
            return (
              <SingleCoin
                odd={odd}
                key={coin.id}
                currency={activeCurrency}
                coinData={coin}
              />
            );
          }
        })}
      </section>
    </main>
  );
}

export default CoinCatalogue;
