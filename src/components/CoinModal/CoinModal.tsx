import { Coin } from "@/utils/fetchCoins";
import { Chart, CategoryScale } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import fetchPriceHistory from "@/utils/fetchPriceHistory";

interface CoinInfoProps {
  currency: string;
  coinData: Coin;
}

Chart.register(CategoryScale);

export default function CoinModal({ currency, coinData }: CoinInfoProps) {
  const now = Math.round(new Date().getTime() / 1000);
  const yesterday = now - 86400;

  const [fromDate, setFromDate] = useState(yesterday);
  const [timeScale, setTimeScale] = useState("24h");
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  //console.log(coinData);

  const prices = fetchPriceHistory(coinData.id, currency, fromDate, now);

  if (prices == "Refreshing..." || prices == "An error has occurred") {
    return <div className="text-blue-300 text-2xl">{prices}</div>;
  }

  if (!prices) {
    return (
      <div className="text-blue-300 text-2xl">
        Unexpected error, api response is null!
      </div>
    );
  }

  let graphData = {
    labels: [],
    datasets: [
      {
        label: "",
        borderColor: "#000",
        backgroundColor: "#000",
        data: [],
      },
    ],
  };

  let graphOptions = {
    plugins: {
      title: {
        display: true,
        text: "Previous " + timeScale + " " + coinData.name + " Price",
        color: "#FFF",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#FFF",
        },
      },
    },
  };

  let timeScalePriceDiff: string | number = 0;

  //console.log(priceHistory);

  if (prices.length > 0) {
    let priceDates: never[] = [];
    let priceValues: never[] = [];

    prices.forEach((subArrayValues: never, i: number) => {
      priceDates.push(subArrayValues[0]);
      priceValues.push(subArrayValues[1]);
    });

    if (priceValues && priceValues.length > 0) {
      let currDiff = priceValues[priceValues.length - 1] - priceValues[0];
      if (currDiff !== 0)
        timeScalePriceDiff = (
          (currDiff / priceValues[priceValues.length - 1]) *
          100
        ).toFixed(2);
    }

    if (timeScale === "24h")
      timeScalePriceDiff = coinData.price_change_percentage_24h;

    graphData = {
      labels: priceDates,
      datasets: [
        {
          label: coinData.name + " price",
          borderColor: "#FFF",
          backgroundColor: "#FFF",
          data: priceValues,
        },
      ],
    };
  }

  return (
    <div className="dark:bg-zinc-800 w-5/6 p-4">
      <div className="flex dark:text-white">Actions</div>
      <div className="flex gap-4">
        <div className="dark:text-white">Stats</div>
        {errored || loading ? (
          <div>Waiting for price information...</div>
        ) : (
          <div>
            <Line data={graphData} options={graphOptions}></Line>
          </div>
        )}
      </div>
    </div>
  );
}
