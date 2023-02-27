import { TextInput, Select } from "@mantine/core";
import { useCoin } from '@/utils/coinContext';

function Banner() {
  const { switchCurrency } = useCoin();

  return (
    <header className="w-full dark:bg-zinc-900 bg-white block sm:flex sm:justify-between drop-shadow-sm">
      <div className="dark:text-white text-zinc-800 text-3xl p-2 text-center">
        Crypto Tracker v2
      </div>
      <div className="flex p-2 w-full gap-4 sm:w-1/6 justify-around">
        <TextInput
          placeholder="Bitcoin"
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
          onChange={(currency: string) => {switchCurrency(currency)}}
          classNames={{
            root: "w-1/5 drop-shadow-md",
            input: "font-raleway dark:text-white dark:bg-zinc-800",
            dropdown:
              "dark:text-white dark:bg-zinc-800 border-1 border-blue-500",
            item: "dark:text-white",
          }}
        />
      </div>
    </header>
  );
}

export default Banner;
