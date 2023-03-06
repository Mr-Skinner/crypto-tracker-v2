import { Coin } from "@/utils/fetchCoins";
import { useCoin } from "@/utils/coinContext";

import SingleCoin from "./SingleCoin";

function CoinCatalogue() {
  const { activeCurrency, coinData, errored, loading, enteredCoin } = useCoin();
  // const {
  //   data: coins,
  //   error,
  //   isError,
  //   isLoading,
  // } = useQuery(["coins", activeCurrency], () => fetchCoins(activeCurrency));

  if (loading) {
    return <div className="text-blue-300 text-2xl">Loading...</div>;
  }

  if (errored) {
    return <div className="text-red-300 text-2xl">Error!</div>;
  }

  //console.log("coinData:", coinData);
  //console.log("isError:", errored);
  //console.log("isLoading:", loading);
  //console.log("Search input", enteredCoin);

  let filteredCoins = coinData.filter((coin) => {
    if (coin) {
      return coin.name.toLowerCase().includes(enteredCoin.toLowerCase());
    }

    return 0;
  });

  return (
    <main className="p-4 sm:p-8 dark:bg-zinc-800 bg-gray-100 h-full w-full">
      <div className="flex w-full pl-16 sm:pl-[5rem] gap-4 text-zinc-400">
        <h2 className="hidden sm:block text-xl hover:border-b-[1px] hover-effect">
          Name
        </h2>
        <h2 className="text-md sm:text-xl hover-effect">Current Price</h2>
        <h2 className="text-md sm:text-xl hover-effect">24hrs ⇵</h2>
        <h2 className="text-md sm:text-xl hover-effect">All Time High</h2>
        <h2 className="text-md sm:text-xl hover-effect">All Time Low</h2>
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
