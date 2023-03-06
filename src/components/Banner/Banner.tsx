import { useState, useEffect } from "react";
import { TextInput, Select } from "@mantine/core";
import { useCoin } from "@/utils/coinContext";
import { useDebounce } from "@/hooks/useDebounce";

function Banner() {
  const [coinInput, setCoinInput] = useState("");
  const { switchCurrency, setEnteredCoin, changeSort } = useCoin();

  const coinInputHandler = (inputCoin: string) => {
    setCoinInput(inputCoin);
  };

  const sortCoinsHandler = (criteria: string) => {
    changeSort(criteria);
  };

  const debouncedCoinInput = useDebounce(coinInput, 300);

  useEffect(() => {
    setEnteredCoin(debouncedCoinInput);
  }, [debouncedCoinInput]);

  return (
    <header className="w-full dark:bg-zinc-900 bg-white block sm:flex sm:justify-between drop-shadow-sm">
      <div className="dark:text-white text-zinc-800 text-3xl p-2 text-center">
        Crypto Tracker v2
      </div>
      <div className="flex p-2 w-full gap-4 sm:w-1/6 justify-around">
        <TextInput
          onChange={(e) => coinInputHandler(e.target.value)}
          placeholder="Bitcoin"
          value={coinInput}
          classNames={{
            root: "w-4/5 drop-shadow-md",
            input: "font-raleway dark:text-white dark:bg-zinc-800",
          }}
        />
        <Select
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          placeholder="$"
          data={[
            { value: "usd", label: "$" },
            { value: "gbp", label: "£" },
            { value: "eur", label: "€" },
          ]}
          onChange={(currency: string) => {
            switchCurrency(currency);
          }}
          classNames={{
            root: "w-1/5 drop-shadow-md",
            input: "font-raleway dark:text-white dark:bg-zinc-800",
            dropdown:
              "dark:text-white dark:bg-zinc-800 border-1 border-blue-500",
            item: "dark:text-white dark:hover:bg-blue-300",
          }}
        />
        <Select
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          placeholder="Sort"
          data={[
            { value: "market_cap", label: "Market Cap" },
            { value: "favourites", label: "Favourites" },
            { value: "name_asc", label: "Name (asc)" },
            { value: "name_desc", label: "Name (desc)" },
            { value: "price_asc", label: "Price (asc)" },
            { value: "price_desc", label: "Price (desc)" },
            { value: "top_movers", label: "Top Movers" },
          ]}
          onChange={(criteria: string) => {
            sortCoinsHandler(criteria);
          }}
          classNames={{
            root: "w-1/5 drop-shadow-md",
            input: "font-raleway dark:text-white dark:bg-zinc-800",
            dropdown:
              "dark:text-white dark:bg-zinc-800 border-1 border-blue-500",
            item: "dark:text-white dark:hover:bg-blue-300",
          }}
        />
      </div>
    </header>
  );
}

export default Banner;
