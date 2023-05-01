import axios from "axios";

async function fetchPriceHistory(
  id: string,
  currency: string,
  fromDate: number,
  now: number
) {
  const convertDateTime = (subArray: any) => {
    let newDate = new Date(subArray[0]).toISOString();
    newDate = newDate.split("T")[0] + " " + newDate.split("T")[1].split(".")[0];
    let newArray = [newDate, subArray[1]];
    return newArray;
  };

  const coingeckoUrl =
    "https://api.coingecko.com/api/v3/coins/" +
    id +
    "/market_chart/range?vs_currency=" +
    currency +
    "&from=" +
    fromDate +
    "&to=" +
    now +
    "";
  const { data } = await axios.get(coingeckoUrl);
  const priceData = data.prices;

  return priceData?.map(convertDateTime) ?? null;
}

export default fetchPriceHistory;
