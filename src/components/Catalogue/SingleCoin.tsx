import { Coin } from "@/utils/fetchCoins";
import { countryCodeMap } from "@/utils/coinContext";

interface SingleCoinProps {
  currency: string;
  coinData: Coin;
}

export default function SingleCoin({ currency, coinData }: SingleCoinProps) {
  return (
    <div className="flex bg-transparent p-4 border-b-[1px] border-gray-100 gap-4">
      <img src={coinData.image} alt="" className="h-[50px] object-cover" />
      <p className="my-auto text-xl w-1/5 sm:w-1/6 md:w-[10%]">
        {coinData.name}
      </p>
      <p className="my-auto">
        {coinData.current_price > 1
          ? new Intl.NumberFormat(countryCodeMap[currency], {
              style: "currency",
              currency: currency.toUpperCase(),
              minimumFractionDigits: 2,
            }).format(coinData.current_price)
          : new Intl.NumberFormat(countryCodeMap[currency], {
              style: "currency",
              currency: currency.toUpperCase(),
            }).format(coinData.current_price)}
      </p>
    </div>
  );
}
