import { Coin } from "@/utils/fetchCoins";
import { countryCodeMap } from "@/utils/coinContext";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CoinModal from "../CoinModal/CoinModal";

interface SingleCoinProps {
  odd: boolean;
  currency: string;
  coinData: Coin;
}

export default function SingleCoin({
  odd,
  currency,
  coinData,
}: SingleCoinProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} className="w-5/6">
        <CoinModal currency={currency} coinData={coinData}></CoinModal>
      </Modal>

      <div
        className={
          odd
            ? "flex bg-zinc-700 p-4 gap-4 hover-effect"
            : "flex bg-transparent p-4 gap-4 hover-effect"
        }
        onClick={open}
      >
        <img src={coinData.image} alt="" className="object-cover h-8 sm:h-12" />
        <p className="hidden sm:block my-auto text-xl w-1/5 sm:w-1/6 md:w-[10%]">
          {coinData.name}
        </p>
        <p className="my-auto w-1/5 sm:w-1/6">
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
        <p
          className={
            coinData.price_change_percentage_24h < 0
              ? "text-red-400 w-[12.5%] text-right ml-4"
              : "text-green-400 w-[12.5%] text-right ml-4"
          }
        >
          {coinData.price_change_percentage_24h.toFixed(2)}%
        </p>
        <p className="w-1/5 sm:w-1/6 ml-6">
          {coinData.ath > 1
            ? new Intl.NumberFormat(countryCodeMap[currency], {
                style: "currency",
                currency: currency.toUpperCase(),
                minimumFractionDigits: 2,
              }).format(coinData.ath)
            : new Intl.NumberFormat(countryCodeMap[currency], {
                style: "currency",
                currency: currency.toUpperCase(),
              }).format(coinData.ath)}
        </p>
        <p className="w-1/5 sm:w-1/6 ml-6 text-end">
          {coinData.atl > 1
            ? new Intl.NumberFormat(countryCodeMap[currency], {
                style: "currency",
                currency: currency.toUpperCase(),
                minimumFractionDigits: 2,
              }).format(coinData.atl)
            : new Intl.NumberFormat(countryCodeMap[currency], {
                style: "currency",
                currency: currency.toUpperCase(),
              }).format(coinData.atl)}
        </p>
      </div>
    </>
  );
}
