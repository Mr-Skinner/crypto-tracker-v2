import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import fetchCoins, { Coin } from "@/utils/fetchCoins";
import { useCoin } from "@/utils/coinContext";

import SingleCoin from "./SingleCoin";

function CoinCatalogue() {
  const { activeCurrency } = useCoin();
  const {
    data: coins,
    error,
    isError,
    isLoading,
  } = useQuery(["coins", activeCurrency], () => fetchCoins(activeCurrency));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  //console.log("Coins:", coins);

  return (
    <section className="p-4 sm:p-8 dark:bg-zinc-800 bg-gray-100 h-full w-full">
      {coins.map((coin: Coin, id: number) => {
        if (id < 5) {
          console.log(coin);
          return (
            <SingleCoin
              key={coin.id}
              currency={activeCurrency}
              coinData={coin}
            />
          );
        }
      })}
    </section>
  );
}

export default CoinCatalogue;
