import { useState } from "react";
import { ActionIcon, Select } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { Burger } from "@mantine/core";
import { useCoin } from "@/utils/coinContext";

export default function Footer() {
  const { switchCurrency, changeSort } = useCoin();
  const [isExpanded, setIsExpanded] = useState(false);

  const sortSelectRootClass = isExpanded
    ? "w-3/5 drop-shadow-md mx-auto"
    : "hidden";

  const currSelectRootClass = isExpanded
    ? "w-1/5 drop-shadow-md mx-auto"
    : "hidden";

  return (
    <div
      className={
        !isExpanded
          ? "footer transition-height"
          : "footer-expanded transition-height"
      }
    >
      {/* <ActionIcon
        className="dark:hover:bg-transparent w-8 h-8 mx-auto my-2"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <IconMenu2
          size={"2rem"}
          className="text-zinc-600 dark:text-white"
        ></IconMenu2>
      </ActionIcon> */}
      <Burger
        classNames={{
          root: "w-8 h-8 mx-auto my-2",
          burger:
            "bg-zinc-600 dark:bg-white before:bg-zinc-600 dark:before:bg-white after:bg-zinc-600 dark:after:bg-white",
        }}
        opened={isExpanded}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      ></Burger>
      <div className="flex">
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
            root: currSelectRootClass,
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
            changeSort(criteria);
          }}
          classNames={{
            root: sortSelectRootClass,
            input: "font-raleway dark:text-white dark:bg-zinc-800",
            dropdown:
              "dark:text-white dark:bg-zinc-800 border-1 border-blue-500",
            item: "dark:text-white dark:hover:bg-blue-300",
          }}
        />
      </div>
    </div>
  );
}
