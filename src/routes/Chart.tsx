import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface IChart {
  coinID: string;
}

function Chart({ coinID }: IChart) {
  const { isLoading, data } = useQuery(["ohlcv", coinID], () =>
    fetchCoinHistory(coinID)
  );
  return <h1>Chart</h1>;
}

export default Chart;